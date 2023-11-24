<?php

namespace App\Http\Controllers;

use App\Models\Job;
use Illuminate\Support\Str;
use App\Http\Resources\JobResource;
use Illuminate\Support\Facades\File;
use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use Symfony\Component\HttpFoundation\Request;


class JobController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $user = $request->user();

        return JobResource::collection(
            Job::where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(10)
        );
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobRequest $request)
    {
        //
        $data = $request->validated();

        // Extract data for Job creation
        $jobData = [
            'title' => $data['title'],
            'description' => $data['description'],
            'status' => $data['status'],
            'user_id' => $data['user_id'] 
            // Add other fields as needed
        ];

        $job = Job::create($jobData);

        // if (isset($data['attachments'])) {
        //     $relPath = $this->saveImage($data['attachments']);
        //     $data['attachments'] = $relPath;
        // }

         // Handle attachments if they exist
        if (isset($data['attachments']) && is_array($data['attachments'])) {
            $attachmentPaths = [];

            foreach ($data['attachments'] as $attachment) {
                // Assuming 'file' is a File object and 'url' is the data URL
                $relPath = $this->saveImage($attachment['url']);
                $attachmentPaths[] = $relPath;
            }

            $data['attachments'] = $attachmentPaths;
        }

         // Extract data for JobDetail creation
        $jobDetailData = [
            'priority' => $data['priority'],
            'completion_date' => $data['completion_date'],
            'est_cost' => $data['est_cost'],
            'attachments' => json_encode($data['attachments'])
        // Add other fields for JobDetail as needed
        ];

       
        // Create the associated JobDetail for the Job
         $job->jobDetail()->create($jobDetailData);

        return new JobResource($job);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job, Request $request)
    {
        $user = $request->user();

        if ($user->id !== $job->user_id) {
            return abort(403, 'You are not authorized to view this job');
        }

        return new JobResource($job);

    }


    public function update(UpdateJobRequest $request, Job $job)
    {
        $data = $request->validated();
    
        // Update the Job model
        $job->update([
            'title' => $data['title'],
            'description' => $data['description'],
            'status' => $data['status'],
            'user_id' => $data['user_id'] 
            // Add other fields as needed
        ]);

        // TODO check if image has changed if not, dont save
        if (isset($data['attachments']) && is_array($data['attachments'])) {
            // Handle changes in attachments
            $newAttachmentPaths = [];
        
            foreach ($data['attachments'] as $attachment) {
                // Assuming 'file' is a File object and 'url' is the data URL
                $relPath = $this->saveImage($attachment['url']);
                $newAttachmentPaths[] = $relPath;
            }
        
            // Delete existing attachments that are not in the new set
            if ($job->attachments) {
                $existingAttachmentPaths = is_array($job->attachments) ? $job->attachments : [$job->attachments];
        
                foreach ($existingAttachmentPaths as $existingPath) {
                    if (!in_array($existingPath, $newAttachmentPaths)) {
                        $absolutePath = public_path($existingPath);
                        File::delete($absolutePath);
                    }
                }
            }
        
            // Update the attachments field with the new paths
            $data['attachments'] = $newAttachmentPaths;
        }
    
  
    
        // Check if the Job model has an associated JobDetail
        if ($job->jobDetail) {
            
            // Update the associated JobDetail
            $job->jobDetail->update([
                'priority' => $data['priority'],
                'completion_date' => $data['completion_date'],
                'est_cost' => $data['est_cost'],
                'attachments' => json_encode($data['attachments']),
                // Add other fields for JobDetail as needed
            ]);
        } else {
            // If there is no associated JobDetail, you can create one if needed
            $job->jobDetail()->create([
                'priority' => $data['priority'],
                'completion_date' => $data['completion_date'],
                'est_cost' => $data['est_cost'],
                'attachments' => $data['attachments'],
                // Add other fields for JobDetail as needed
            ]);
        }
    
        return new JobResource($job);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job, Request $request)
    {
        $user = $request->user();

        if($user->id !== $job->user_id){
            return abort(403, 'You are not authorized to delete this job');
        }

        return response('', 204);
    }


    private function saveImage($image)
    {
        // check if base64 string contains data
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {

            $data = substr($image, strpos($image, ',') + 1);
        
            // Get file extension
            $type = strtolower($type[1]); // jpg, png, gif

            if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
                throw new \Exception('invalid image type');
            }

            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('base64_decode failed');
            }

        } else {
            throw new \Exception('did not match data URI with image data');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relPath = $dir . $file;

        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relPath, $data);

        return $relPath;

    }
}
