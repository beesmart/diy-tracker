<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {

        $job = $this->route('job');

        if ($this->user()->id !== $job->user_id) {
            return false;
        }
        
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        // Validation rules for the Job table
        $jobRules = [
            'title' => 'required|string|max:1000',
            'description' => 'nullable|string|max:1000',
            'user_id' => 'exists:users,id',
            'status' => 'required|boolean',
        ];

        // If the request contains data for job_details, include the validation rules
        if ($this->has('priority') || $this->has('completion_date') || $this->has('est_cost') || $this->has('attachments')) {
            $jobDetailRules = [
                'priority' => 'string|max:255',
                'completion_date' => 'nullable|date',
                'est_cost' => 'nullable|numeric',
                'attachments' => 'nullable|string'
            ];

            // Merge the rules for Job and JobDetail
            $jobRules = array_merge($jobRules, $jobDetailRules);

        }

        return $jobRules;
    }
}
