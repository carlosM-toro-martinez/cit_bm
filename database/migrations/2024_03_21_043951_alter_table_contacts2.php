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
        Schema::table('contacts', function (Blueprint $table) {
            if (Schema::hasColumn('contacts', 'coordinates')) {
                $table->dropColumn('coordinates');
            }
        });

        // Agregar la nueva columna con el tipo de datos json
        Schema::table('contacts', function (Blueprint $table) {
            $table->json('coordinates')->nullable()->after('id_contact');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            $table->dropColumn('coordinates');
        });
    }
};
