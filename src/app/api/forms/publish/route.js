import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
    try {
        const formSchema = await request.json();

        if (!formSchema.fields || !Array.isArray(formSchema.fields)) {
            return NextResponse.json({ error: 'Invalid form schema' }, { status: 400 });
        }

        // const javaBackendUrl = process.env.JAVA_BACKEND_URL || 'http://localhost:8080';
        // const javaSecretToken = process.env.JAVA_SERVICE_SECRET; 

        // const response = await fetch(`${javaBackendUrl}/api/forms/publish`, {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     // Inject a server-to-server secret so Java knows it came from your Node layer
        //     'Authorization': `Bearer ${javaSecretToken}`, 
        //   },
        //   body: JSON.stringify(formSchema),
        // });

        console.log(formSchema)

        const ollamaResponse = await fetch('http://127.0.0.1:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'react-compiler',
                prompt: JSON.stringify(formSchema),
                stream: false,
            }),
        });

        const llmData = await ollamaResponse.json();

        let cleanCode = llmData.response;
        cleanCode = llmData.response.replace(/^```[a-zA-Z]*\n?/gm, '').replace(/```$/gm, '').trim();

        cleanCode = cleanCode.replace(/['"]?use client['"]?;?/gi, '').trim();

        cleanCode = `'use client';\nimport React, { useState, useEffect } from 'react';\n\n${cleanCode}`;

        cleanCode = cleanCode.replace(/(import React.*?from ['"]react['"];?)\n+/gi, '');
        
        cleanCode = cleanCode.replace(/'use client';/, "'use client';\nimport React, { useState, useEffect } from 'react';");

        const targetDirectory = path.join(process.cwd(), 'src', 'app', 'active-user', 'generated-form');
        const targetFile = path.join(targetDirectory, `page.jsx`);

        if (!fs.existsSync(targetDirectory)) {
            fs.mkdirSync(targetDirectory, { recursive: true });
        }

        fs.writeFileSync(targetFile, cleanCode.trim(), 'utf8');

        return NextResponse.json({
            success: true,
            message: 'Code generated and saved successfully!',
            //route: '/active-user/generated-form' 
        });

    } catch (error) {
        console.error('Compiler Error:', error);
        return NextResponse.json({ error: 'Failed to compile UI' }, { status: 500 });
    }
}