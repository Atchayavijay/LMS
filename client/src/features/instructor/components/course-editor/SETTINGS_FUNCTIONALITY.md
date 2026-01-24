# Settings Functionality - Complete Guide

## ✅ Implemented Features

### 1. **Validity Setting** (Course Access Duration)

#### How it Works:
- **Toggle ON**: Shows slider and days input
- **Toggle OFF**: Hides the days selector, course has unlimited access

#### Features:
- **Slider**: Drag to set days (1-365)
- **Input Field**: Type exact number of days (1-365)
- **Real-time Sync**: Slider and input are synced
- **Validation**: Only accepts 1-365 days
- **Visual Feedback**: Shows selected days in orange text
- **Default Value**: 30 days

#### User Flow:
```javascript
1. Click "Validity" toggle → Turns orange
2. Slider appears with days input
3. Drag slider OR type number (1-365)
4. See message: "Students will have access for X days from enrollment"
5. Click "Save changes"
6. ✅ Setting saved to backend
```

#### Technical Details:
```javascript
// State structure
{
    validity: true,        // Toggle state
    validityDays: 30      // Number of days (1-365)
}

// When validity is ON:
- Students can access course for X days from enrollment date
- After X days, access is automatically revoked

// When validity is OFF:
- Students have unlimited access
- validityDays value is ignored
```

---

### 2. **Show as Locked**

#### Purpose:
Control whether this course appears as "locked" to students who are enrolled in other courses.

#### States:
- **ON**: Course shows as locked to other course customers
- **OFF**: Course is visible but not necessarily accessible

#### Usage:
```javascript
// Marketing strategy: 
// Show premium courses as "locked" to encourage upgrades
```

---

### 3. **Disable QnA**

#### Purpose:
Turn off the Q&A feature for students.

#### States:
- **ON**: Students CANNOT ask questions on the course
- **OFF**: Students CAN ask questions (default)

#### Impact:
```javascript
// When enabled:
- Q&A tab hidden from students
- "Ask Question" button disabled
- Existing questions remain visible (read-only)

// When disabled (default):
- Students can ask new questions
- Students can reply to questions
- Full Q&A functionality available
```

---

### 4. **Disable Comments**

#### Purpose:
Turn off the commenting feature for students.

#### States:
- **ON**: Students CANNOT comment on course content
- **OFF**: Students CAN comment (default)

#### Impact:
```javascript
// When enabled:
- Comment box hidden from students
- "Add Comment" button disabled
- Existing comments remain visible (read-only)

// When disabled (default):
- Students can add comments
- Students can reply to comments
- Full commenting functionality available
```

---

## 💾 Save Functionality

### What Gets Saved:
```javascript
{
    validity: true,              // Toggle state
    validityDays: 60,           // Number of days
    showAsLocked: false,         // Locked status
    disableQnA: true,           // Q&A disabled
    disableComments: false       // Comments enabled
}
```

### Save Process:
1. User changes any setting
2. State updates immediately (local)
3. User clicks "Save changes"
4. Validation runs (all fields)
5. Backend API called (PUT /courses/:id)
6. Settings saved to database
7. Success message shown
8. Course data reloaded

---

## 🛡️ Validation Rules

### Validity Days:
- ✅ Must be between 1-365
- ✅ Must be a whole number
- ✅ Only enforced when validity toggle is ON
- ✅ Default: 30 days

### Toggle Settings:
- ✅ All are boolean (true/false)
- ✅ Independent of each other
- ✅ Can be combined (e.g., disable both QnA and Comments)

---

## 🔄 Real-time Behavior

### Validity Slider + Input Sync:
```javascript
User drags slider to 90 days
→ Input shows "90"
→ Message updates: "...for 90 days from..."

User types "120" in input
→ Slider moves to position 120
→ Message updates: "...for 120 days from..."
```

### Toggle States:
```javascript
Click "Validity" toggle
→ Turns orange immediately
→ Days selector slides in
→ Ready to set duration

Click toggle again
→ Turns gray
→ Days selector slides out
→ Unlimited access mode
```

---

## 📱 User Interface

### Validity Section (When ON):
```
┌─────────────────────────────────────┐
│ Validity                     [ON ●] │
│ Select how long customers...        │
│ ─────────────────────────────────── │
│ ━━━━━━━━━━●──────────   [60] Days  │
│ Students will have access for       │
│ 60 days from enrollment date        │
└─────────────────────────────────────┘
```

### Engagement Section:
```
┌─────────────────────────────────────┐
│ Disable QnA                 [OFF ○] │
│ Your customers won't be able to...  │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│ Disable comments            [OFF ○] │
│ Your customers won't be able to...  │
└─────────────────────────────────────┘
```

---

## 🎯 Use Cases

### 1. Limited-Time Course:
```
Validity: ON
Validity Days: 90
→ Students access expires 90 days after purchase
```

### 2. Self-Paced Course:
```
Validity: OFF
→ Students have lifetime access
```

### 3. Structured Course (No Q&A):
```
Disable QnA: ON
Disable Comments: OFF
→ Students can comment but not ask questions
→ Keeps discussions focused
```

### 4. Automated Course (No Interaction):
```
Disable QnA: ON
Disable Comments: ON
→ Pure content delivery
→ No student interaction
```

---

## 🚀 Future Enhancements

### Planned Features:
1. **Custom Validity Periods**:
   - Monthly subscription
   - Yearly access
   - Lifetime access

2. **Scheduled Access**:
   - Start date
   - End date
   - Time-based unlock

3. **Conditional Access**:
   - Based on completion %
   - Based on quiz scores
   - Based on prerequisites

4. **Advanced Engagement**:
   - Q&A moderation queue
   - Comment approval workflow
   - Auto-responses

---

## 🔧 Technical Implementation

### Component Structure:
```
InformationTab.jsx
├── Validity Setting (custom)
│   ├── Toggle
│   ├── Slider (1-365)
│   └── Number Input
├── Show as Locked (SettingToggle)
├── Disable QnA (SettingToggle)
└── Disable Comments (SettingToggle)
```

### State Management:
```javascript
// Local state in CreateCourse.jsx
const [courseDetails, setCourseDetails] = useState({
    validity: false,
    validityDays: 30,
    showAsLocked: false,
    disableQnA: false,
    disableComments: false
});

// Passed to InformationTab via props
<InformationTab 
    courseDetails={courseDetails}
    setCourseDetails={setCourseDetails}
/>
```

### API Integration:
```javascript
// Save endpoint
PUT /courses/:id
Body: {
    validity: true,
    validityDays: 60,
    showAsLocked: false,
    disableQnA: true,
    disableComments: false
}

// Backend should:
1. Validate validityDays (1-365)
2. Store all settings
3. Apply settings to course access logic
4. Return updated course
```

---

## ✅ Testing Checklist

- [ ] Toggle validity ON → Shows slider
- [ ] Toggle validity OFF → Hides slider
- [ ] Drag slider → Input updates
- [ ] Type in input → Slider updates
- [ ] Enter invalid number → Rejected
- [ ] Save with validity ON → Saves days
- [ ] Save with validity OFF → Unlimited access
- [ ] Toggle QnA ON → Students can't ask questions
- [ ] Toggle Comments ON → Students can't comment
- [ ] All settings persist after save
- [ ] Settings reflected in My Courses
