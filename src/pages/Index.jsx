import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload } from 'lucide-react';

const Index = () => {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [adjustedResume, setAdjustedResume] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleResumeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setResume(e.target.result);
      reader.readAsText(file);
    }
  };

  const handleAdjustResume = () => {
    setIsLoading(true);
    setError('');
    // Simulating API call for resume adjustment
    setTimeout(() => {
      try {
        // This is a placeholder for the actual resume adjustment logic
        const adjustedText = `Adjusted Resume based on job description:
        
${resume}

Key points from job description incorporated:
- ${jobDescription.split('\n')[0]}
- ${jobDescription.split('\n')[1] || 'Additional relevant skills highlighted'}
- ATS-friendly formatting applied`;
        
        setAdjustedResume(adjustedText);
        setIsLoading(false);
      } catch (err) {
        setError('An error occurred while adjusting the resume. Please try again.');
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">ATS-Friendly Resume Adjuster</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload Resume</CardTitle>
            <CardDescription>Upload your resume or paste it below</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <label htmlFor="resume-upload" className="cursor-pointer">
                <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Upload Resume
                    </span>
                  </div>
                </div>
                <input
                  id="resume-upload"
                  type="file"
                  className="hidden"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                />
              </label>
            </div>
            <Textarea
              placeholder="Or paste your resume here..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="min-h-[200px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Job Description</CardTitle>
            <CardDescription>Paste the job description here</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the job description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px]"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleAdjustResume} disabled={isLoading || !resume || !jobDescription}>
              {isLoading ? 'Adjusting...' : 'Adjust Resume'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive" className="mt-8">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {adjustedResume && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Adjusted Resume</CardTitle>
            <CardDescription>Your resume adjusted for ATS compatibility</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={adjustedResume}
              readOnly
              className="min-h-[300px]"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigator.clipboard.writeText(adjustedResume)}>
              Copy to Clipboard
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Index;
