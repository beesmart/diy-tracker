<?php

namespace App\Models;

use App\Models\JobDetails;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Job extends Model
{
    use HasFactory;
    use HasSlug;

    protected $fillable = ['title', 'description', 'created_at', 'updated_at', 'user_id', 'status'];


    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function jobDetail()
    {
        return $this->hasOne(JobDetails::class);
    }

}
