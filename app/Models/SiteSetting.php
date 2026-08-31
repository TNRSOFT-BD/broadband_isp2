<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_name',
        'paybill_client_id',
        'logo',
        'favicon',
    ];

    public static function getActive(): ?self
    {
        return static::query()->first();
    }
}
