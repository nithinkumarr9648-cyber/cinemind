/*
CineMind — Stable Minimal Next.js (JavaScript) + Express Scaffold (Fixed)

Summary
-------
This document is a single, final, compatibility-first rewrite of the CineMind scaffold that eliminates repeated `Unexpected token` errors (often caused by mismatched TSX/JSX parsing or leftover `.tsx` files). Key strategies used:
- Frontend is pure JavaScript (no TypeScript/TSX) and uses very conservative JSX (no Next `Link`, no nested template expressions inside JSX text nodes).
- Explicit instruction to remove any old `.tsx` files (particularly `pages/index.tsx`) from the project — leftover .tsx files are a common source of the recurring token errors you reported.
- Backend remains a simple Express server with a mocked response and an unchanged test script (`backend/test/test_generate.js`) — per your requirement, we did not remove or alter the existing test case.

BEFORE YOU RUN
--------------
1. If you previously copied files from earlier scaffold versions, **delete any `.tsx` files** in the `frontend/pages` or `frontend/components` folders (especially `pages/index.tsx`) — leaving them alongside `.js` files can cause the parser to attempt TSX parsing and raise `Unexpected token` errors.
2. Make sure your Node version is recent (v16+ recommended).

HOW TO USE
----------
1. Create two folders at the project root: `frontend` and `backend`.
2. Copy each file block below into the indicated file path (create subfolders as needed).
3. In each folder run `npm install`.
4. Start backend first: `cd backend && npm run dev`.
5. Start frontend: `cd frontend && npm run dev`.
6. Open `http://localhost:3000` (homepage) and `http://localhost:3000/tools/story` (tool page).
7. Run the API test: `cd backend && npm run test:api`.

--------------------------------------------------------------------------------
FRONTEND: frontend/package.json
--------------------------------------------------------------------------------
{
  "name": "cinemind-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "13.4.6",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "axios": "1.4.0"
  },
  "devDependencies": {
    "autoprefixer": "10.4.14",
    "postcss": "8.4.23",
    "tailwindcss": "3.4.7"
  }
}

--------------------------------------------------------------------------------
FRONTEND: frontend/next.config.js
--------------------------------------------------------------------------------
module.exports = {
  reactStrictMode: true,
}

--------------------------------------------------------------------------------
FRONTEND: frontend/postcss.config.js
--------------------------------------------------------------------------------
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

--------------------------------------------------------------------------------
FRONTEND: frontend/tailwind.config.js
--------------------------------------------------------------------------------
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cinemindBg: '#0B0F16',
        neonBlue: '#00AEEF',
        accentOrange: '#FF9500'
      }
    }
  },
  plugins: [],
}

--------------------------------------------------------------------------------
FRONTEND: frontend/styles/globals.css
--------------------------------------------------------------------------------
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #__next {
  height: 100%;
}
body {
  @apply bg-cinemindBg text-white font-sans;
}

--------------------------------------------------------------------------------
FRONTEND: frontend/pages/_app.js
--------------------------------------------------------------------------------
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

--------------------------------------------------------------------------------
FRONTEND: frontend/components/Header.js
--------------------------------------------------------------------------------
import React from 'react'

export default function Header() {
  return (
    <header style={{padding:16,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}>
        <div style={{fontSize:20,fontWeight:700,color:'#00AEEF'}}>CineMind</div>
        <div style={{fontSize:12,color:'#9CA3AF'}}>AI</div>
      </div>
      <nav style={{display:'flex',gap:12}}>
        <a href="/" style={{fontSize:14,color:'#E5E7EB'}}>Home</a>
        <a href="/tools/story" style={{fontSize:14,color:'#E5E7EB'}}>Story Generator</a>
        <a href="/pricing" style={{fontSize:14,color:'#E5E7EB'}}>Pricing</a>
        <a href="/about" style={{fontSize:14,color:'#E5E7EB'}}>About</a>
      </nav>
    </header>
  )
}

--------------------------------------------------------------------------------
FRONTEND: frontend/pages/index.js
--------------------------------------------------------------------------------
import React from 'react'
import Header from '../components/Header'

export default function Home(){
  return (
    <div style={{minHeight:'100vh'}}>
      <Header />
      <main style={{padding:'48px 24px',maxWidth:900,margin:'0 auto'}}>
        <section style={{display:'flex',flexDirection:'row',gap:24,alignItems:'center',flexWrap:'wrap'}}>
          <div style={{flex:1,minWidth:280}}>
            <h1 style={{fontSize:36,margin:0}}>Create Movie-Ready Stories, Prompts & Teasers in Seconds</h1>
            <p style={{marginTop:16,color:'#9CA3AF'}}>Generate scripts, mass intros, reels, character sheets, posters & cinematic prompts using AI trained for filmmaking.</p>
            <div style={{marginTop:20,display:'flex',gap:12}}>
              <a href="/tools/story" style={{padding:'10px 18px',borderRadius:999,background:'#00AEEF',color:'#000',fontWeight:600,textDecoration:'none'}}>Start Creating</a>
              <a href="/tools/story" style={{padding:'10px 18px',borderRadius:999,border:'1px solid #374151',color:'#E5E7EB',textDecoration:'none'}}>Try Free Scripts</a>
            </div>
          </div>
          <div style={{flex:1,minWidth:280}}>
            <div style={{height:220,background:'#08101a',borderRadius:16,display:'flex',alignItems:'center',justifyContent:'center',color:'#6B7280'}}>Hero Cinematic Mockup</div>
          </div>
        </section>

        <section style={{marginTop:40}}>
          <h2 style={{fontSize:20}}>Featured Tool — Story Generator</h2>
          <p style={{color:'#9CA3AF'}}>Write 1–15 minute cinematic scripts with scenes, camera notes & SFX suggestions.</p>
          <div style={{marginTop:12}}>
            <a href="/tools/story" style={{padding:'8px 14px',borderRadius:8,background:'#FF9500',color:'#000',textDecoration:'none'}}>Open Story Generator</a>
          </div>
        </section>
      </main>
    </div>
  )
}

--------------------------------------------------------------------------------
FRONTEND: frontend/components/ToolInputPanel.js
--------------------------------------------------------------------------------
import React, { useState } from 'react'

export default function ToolInputPanel({onSubmit}){
  const [genre,setGenre] = useState('Action')
  const [language,setLanguage] = useState('Kannada')
  const [length,setLength] = useState(5)
  const [mood,setMood] = useState('Mass')
  const [protagonist,setProtagonist] = useState('Raghu - ex-cop who lost his family')

  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit({genre,language,length,mood,protagonist})}} style={{background:'#07121a',padding:16,borderRadius:12}}>
      <div style={{marginBottom:12}}>
        <label style={{display:'block',color:'#E5E7EB'}}>Genre</label>
        <select value={genre} onChange={(e)=>setGenre(e.target.value)} style={{width:'100%',marginTop:8,padding:8,borderRadius:8,background:'#08121a',color:'#E5E7EB'}}>
          <option>Action</option>
          <option>Drama</option>
          <option>Horror</option>
          <option>Romance</option>
          <option>Comedy</option>
        </select>
      </div>

      <div style={{marginBottom:12}}>
        <label style={{display:'block',color:'#E5E7EB'}}>Language</label>
        <select value={language} onChange={(e)=>setLanguage(e.target.value)} style={{width:'100%',marginTop:8,padding:8,borderRadius:8,background:'#08121a',color:'#E5E7EB'}}>
          <option>Kannada</option>
          <option>Telugu</option>
          <option>Hindi</option>
          <option>English</option>
        </select>
      </div>

      <div style={{marginBottom:12}}>
        <label style={{display:'block',color:'#E5E7EB'}}>Length (minutes)</label>
        <input type="range" min={1} max={15} value={length} onChange={(e)=>setLength(Number(e.target.value))} style={{width:'100%'}} />
        <div style={{color:'#9CA3AF'}}>{length} minute(s)</div>
      </div>

      <div style={{marginBottom:12}}>
        <label style={{display:'block',color:'#E5E7EB'}}>Mood</label>
        <select value={mood} onChange={(e)=>setMood(e.target.value)} style={{width:'100%',marginTop:8,padding:8,borderRadius:8,background:'#08121a',color:'#E5E7EB'}}>
          <option>Mass</option>
          <option>Emotional</option>
          <option>Dark</option>
          <option>Futuristic</option>
        </select>
      </div>

      <div style={{marginBottom:12}}>
        <label style={{display:'block',color:'#E5E7EB'}}>Protagonist brief</label>
        <input value={protagonist} onChange={(e)=>setProtagonist(e.target.value)} style={{width:'100%',marginTop:8,padding:8,borderRadius:8,background:'#08121a',color:'#E5E7EB'}} />
      </div>

      <div style={{display:'flex',gap:12}}>
        <button type="submit" style={{padding:'8px 12px',borderRadius:8,background:'#00AEEF',color:'#000',fontWeight:700}}>Generate My Script</button>
        <button type="button" style={{padding:'8px 12px',borderRadius:8,border:'1px solid #374151',color:'#E5E7EB'}}>Try Sample</button>
      </div>
    </form>
  )
}

--------------------------------------------------------------------------------
FRONTEND: frontend/components/OutputCard.js
--------------------------------------------------------------------------------
import React from 'react'

export default function OutputCard({data}){
  if(!data) return <div style={{padding:16,color:'#9CA3AF'}}>No output yet</div>
  return (
    <div style={{padding:16,background:'#07121a',borderRadius:12}}>
      <h3 style={{fontSize:18,fontWeight:600}}>{data && data.title ? data.title : 'Generated Script'}</h3>
      <pre style={{whiteSpace:'pre-wrap',fontSize:12,color:'#E5E7EB',maxHeight:420,overflow:'auto',marginTop:12}}>{JSON.stringify(data,null,2)}</pre>
      <div style={{marginTop:12,display:'flex',gap:8}}>
        <button style={{padding:'8px 10px',borderRadius:8,background:'#FF9500',color:'#000'}}>Download JSON</button>
        <button style={{padding:'8px 10px',borderRadius:8,border:'1px solid #374151',color:'#E5E7EB'}}>Save</button>
      </div>
    </div>
  )
}

--------------------------------------------------------------------------------
FRONTEND: frontend/pages/tools/story.js
--------------------------------------------------------------------------------
import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import ToolInputPanel from '../../components/ToolInputPanel'
import OutputCard from '../../components/OutputCard'
import axios from 'axios'

export default function StoryTool(){
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleGenerate(payload){
    setLoading(true)
    try{
      const base = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000'
      const res = await axios.post(base + '/generate-story', payload)
      setOutput(res.data)
    }catch(err){
      console.error(err)
      alert('Generation failed')
    }finally{ setLoading(false) }
  }

  // Auto-generate a sample once per browser (hybrid flow)
  useEffect(()=>{
    try{
      const shown = typeof window !== 'undefined' && window.localStorage.getItem('cinemind_sample_shown')
      if(!shown){
        const samplePayload = { genre: 'Action', language: 'Kannada', length: 5, mood: 'Mass', protagonist: 'Raghu - ex-cop who lost his family' }
        handleGenerate(samplePayload)
        try{ window.localStorage.setItem('cinemind_sample_shown','1') }catch(e){}
      }
    }catch(e){ console.warn(e) }
  },[])

  return (
    <div style={{minHeight:'100vh'}}>
      <Header />
      <main style={{padding:24,maxWidth:1100,margin:'0 auto',display:'grid',gridTemplateColumns:'1fr 2fr',gap:24}}>
        <div>
          <ToolInputPanel onSubmit={handleGenerate} />
        </div>
        <div>
          {loading ? <div style={{padding:16}}>Generating...</div> : <OutputCard data={output} />}
        </div>
      </main>
    </div>
  )
}

--------------------------------------------------------------------------------
BACKEND: backend/package.json
--------------------------------------------------------------------------------
{
  "name": "cinemind-backend",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js",
    "test:api": "node test/test_generate.js"
  },
  "dependencies": {
    "express": "4.18.2",
    "body-parser": "1.20.2",
    "cors": "2.8.5",
    "ajv": "8.12.0",
    "axios": "1.4.0",
    "dotenv": "16.1.4"
  },
  "devDependencies": {
    "nodemon": "2.0.22"
  }
}

--------------------------------------------------------------------------------
BACKEND: backend/index.js
--------------------------------------------------------------------------------
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const generateRoute = require('./routes/generate')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// keep consistent route path
app.use('/generate-story', generateRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log('Server running on', PORT))

--------------------------------------------------------------------------------
BACKEND: backend/routes/generate.js
--------------------------------------------------------------------------------
const express = require('express')
const router = express.Router()
const { validateStoryInput } = require('../utils/schemaValidator')
const { buildStoryPrompt } = require('../utils/promptTemplates')

// Replace `mockLLMCall` with real LLM client integration (OpenAI / other).
async function mockLLMCall(prompt){
  // Simple mocked JSON response for testing
  return {
    title: 'Mocked: The Last Stand',
    language: prompt.includes('Kannada') ? 'Kannada' : 'English',
    duration_minutes: 5,
    scenes: [
      { scene_number:1, location:'Bridge', time_of_day:'Night', short_description:'Hero confronts villains', dialogues:[{character:'Hero',line:'I am coming.'}], camera_notes:'Close-up, handheld', sfx:['thunder'] }
    ],
    content_warning: null
  }
}

router.post('/', async (req, res)=>{
  try{
    const input = req.body
    const valid = validateStoryInput(input)
    if(!valid.valid) return res.status(400).json({error:'Invalid input', details: valid.errors})

    const prompt = buildStoryPrompt(input)

    // TODO: pass prompt to real LLM client here (OpenAI, Anthropic, etc.)
    const llmResponse = await mockLLMCall(prompt)

    // Return llmResponse (should match schema)
    res.json(llmResponse)
  }catch(err){
    console.error(err)
    res.status(500).json({error:'Server error'})
  }
})

module.exports = router

--------------------------------------------------------------------------------
BACKEND: backend/utils/promptTemplates.js
--------------------------------------------------------------------------------
function buildStoryPrompt({genre, language, length, mood, protagonist}){
  const schema = '{"title":"string","language":"string","duration_minutes": number,"scenes":[{"scene_number": number,"location":"string","time_of_day":"string","short_description":"string","dialogues":[{"character":"string","line":"string"}],"camera_notes":"string","sfx":["string"]}],"content_warning":"string|null"}'

  return 'SYSTEM: You are CineMind AI — a cinematic screenwriter specialized in short films.\nProduce scene-based scripts with scene headers, stage directions, dialogues labeled by character, and short camera directions. Output MUST be valid JSON as specified.\n\nUSER: Generate a ' + length + '-minute ' + genre + ' script in ' + language + ' with a ' + mood + ' tone. Protagonist: "' + protagonist + '". Create 6-10 scenes. Schema: ' + schema
}

module.exports = { buildStoryPrompt }

--------------------------------------------------------------------------------
BACKEND: backend/utils/schemaValidator.js
--------------------------------------------------------------------------------
const Ajv = require('ajv')
const ajv = new Ajv({allErrors:true})

const storyInputSchema = {
  type: 'object',
  properties: {
    genre: {type:'string'},
    language: {type:'string'},
    length: {type:'number'},
    mood: {type:'string'},
    protagonist: {type:'string'}
  },
  required: ['genre','language','length','mood','protagonist']
}

const validate = ajv.compile(storyInputSchema)

function validateStoryInput(data){
  const valid = validate(data)
  return { valid, errors: valid ? null : validate.errors }
}

module.exports = { validateStoryInput }

--------------------------------------------------------------------------------
BACKEND: backend/test/test_generate.js
--------------------------------------------------------------------------------
// Simple test script to POST to the generate-story endpoint and log response (node script)
const axios = require('axios')

async function runTest(){
  try{
    const res = await axios.post('http://localhost:5000/generate-story', {
      genre: 'Action',
      language: 'Kannada',
      length: 5,
      mood: 'Mass',
      protagonist: 'Raghu - ex-cop who lost his family'
    }, { timeout: 5000 })

    console.log('TEST SUCCESS — Response:')
    console.log(JSON.stringify(res.data, null, 2))
  }catch(err){
    console.error('TEST FAILED')
    if(err.response) console.error('Status:', err.response.status, 'Data:', err.response.data)
    else console.error(err.message)
    process.exit(1)
  }
}

runTest()

--------------------------------------------------------------------------------
ENV: .env.example
--------------------------------------------------------------------------------
# Frontend (.env.local)
NEXT_PUBLIC_API_BASE=http://localhost:5000

# Backend (.env)
OPENAI_API_KEY=your_openai_api_key_here
PORT=5000

--------------------------------------------------------------------------------
Notes & Next Steps
--------------------------------------------------------------------------------
- This JavaScript-first scaffold avoids TSX/TypeScript parsing errors by using plain .js files and conservative JSX patterns. It should stop the repeated `Unexpected token` errors.
- If you still see `Unexpected token` errors, paste the full stack trace and the exact file contents referenced by the error so I can patch that exact line.
- I added a backend test script (`backend/test/test_generate.js`). Do not change this test; it's required for validating the generation endpoint.

--------------------------------------------------------------------------------
End of scaffold file
*/
