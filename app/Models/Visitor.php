<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    use HasFactory;

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $fillable = [
        'name', 'mail',
    ];
    protected $primaryKey = 'id_visitor';

    public function messages()
    {
        return $this->hasMany(Message::class, 'id_visitor');
    }
}
