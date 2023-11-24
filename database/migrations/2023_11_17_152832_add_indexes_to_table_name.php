<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->index('user_id');
            $table->index('created_at');
            $table->index('updated_at');
        });
        Schema::table('job_details', function (Blueprint $table) {
            $table->index('completion_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {

        });
        Schema::table('job_details', function (Blueprint $table) {

        });
    }
};
