# Princess Adventure Voice Game (Day 8)

This project is a voice-based interactive story powered by LiveKit Agents. 
The user interacts with a Game Master (GM) who narrates and guides a simple 
fantasy adventure titled "The Princess of Willowmere".

## 🎮 Game Summary
You help Princess Aurelia find her lost silver locket while exploring Willowmere — 
including the castle, gardens, and village streets. The Game Master maintains 
story continuity and always ends with: "What do you do?"

## ✨ Features
- Interactive voice-based storytelling  
- Friendly and simple Game Master persona  
- Smooth scene descriptions  
- Restart adventure tool  
- Chat transcript UI with GM/Player distinction  
- Custom Lavender-themed Welcome Screen  

## 📂 Project Structure
backend/
  src/agent.py              # Game Master logic  
frontend/
  components/app/
    welcome-view.tsx        # Lavender Princess Welcome UI  
shared-data/

## 🚀 Setup

### Backend
``` bash
cd backend  
pip install -r requirements.txt  
python src/agent.py  
```

### Frontend
``` bash
cd frontend  
npm install  
npm run dev  
```

## 🎨 Welcome Screen Design
- Lavender fantasy theme  
- Rounded decorative card  
- Crown ♕ emblem  
- Three mini-feature blocks: Explore, Talk, Decide  
- Expanded adaptive layout for desktop + mobile  

## 🗣 Gameplay Tips
Speak short actions like:
- "look at the garden"  
- "talk to the guard"  
- "walk to the village"  
- "follow the footprints"  

The GM will react to your choices and build the story around them.

## 🔁 Restarting the Adventure
Say:
- "restart"  
- "start over"  
- "begin again"  

The GM will call the `restart_adventure` tool to reset:
- story history  
- turn counter  
- scene seed  

## 🧙 Tools

**restart_adventure**
Resets the story state to the beginning.

**get_session_summary**
Returns a short recap of recent turns.

## 🌟 Story Arc
A single adventure lasts 8–14 exchanges and may involve:
- exploring the castle  
- clues about the missing locket  
- meeting characters (guards, villagers, etc.)  
- small choices that affect the ending  

## 🔐 Safety
- No personal data asked  
- Purely fictional universe  
- Simple, child-friendly narrative  

## 🏰 Enjoy your magical journey in Willowmere!
Feel free to expand the adventure with new characters, worlds, or item quests.
