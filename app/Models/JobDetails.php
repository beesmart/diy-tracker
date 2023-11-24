<?php

namespace App\Models;

use App\Models\Job;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobDetails extends Model
{
    use HasFactory;

    protected $fillable = ['priority', 'completion_date', 'est_cost', 'attachments'];


    public function location()
    {
        return $this->belongsToMany(Location::class);
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }
    
}
