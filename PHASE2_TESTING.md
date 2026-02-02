# 🎯 Phase 2 Testing Guide
**Enhanced Features Testing Checklist**

## 🚀 Quick Start

```bash
# Start local server
python -m http.server 8000
# or
npx http-server -p 8000

# Open: http://localhost:8000/public/
```

---

## 1️⃣ Dynamic Headline Rotation Testing

### Location
**Page:** `index.html` (Hero section)  
**Element:** Second line under "Brooke Alexis Hanger"

### What to Test

#### ✅ Rotation Behavior
1. **Initial Load**
   - Should display: "Salesforce Sales Cloud Expert"
   - Wait 4 seconds

2. **First Rotation** (4 seconds)
   - Text fades out (opacity 0, moves up 10px)
   - New text: "B2B Revenue Accelerator"
   - Text fades in (slides up from below)

3. **Subsequent Rotations**
   - Continues rotating through all 5 headlines:
     1. Salesforce Sales Cloud Expert
     2. B2B Revenue Accelerator
     3. Pipeline Management Authority
     4. Cloud & AI Solutions Specialist
     5. Enterprise Sales Strategist
   - Loops back to #1 after #5

#### ✅ Interactive Features
1. **Hover to Pause**
   - Hover over the rotating headline
   - Rotation should STOP
   - Move mouse away
   - Rotation should RESUME after current cycle

2. **Tab Visibility**
   - Switch to another browser tab
   - Rotation should pause
   - Return to tab
   - Rotation should resume

#### ✅ Accessibility
1. **Reduced Motion**
   - Mac: System Preferences → Accessibility → Display → Reduce motion
   - Windows: Settings → Ease of Access → Display → Show animations
   - Headline should NOT rotate

2. **Screen Reader**
   - Text should be readable
   - No aria-live announcements (by design)

---

## 2️⃣ Skills Section Filter Testing

### Location
**Page:** `index.html` (Core Expertise section)  
**Element:** Filter bar with 6 buttons + 9 skill cards

### What to Test

#### ✅ Filter Buttons
1. **Initial State**
   - "✨ All Skills" button should be active (teal background)
   - All 9 cards visible

2. **Click Each Filter**
   
   **💼 Sales** (should show 6 cards):
   - B2B Enterprise Sales
   - AI Commercialization
   - Sales Automation
   - Multilingual Sales
   - Strategic Consulting
   - (6th card check)

   **📊 CRM** (should show 5 cards):
   - B2B Enterprise Sales
   - CRM & Analytics
   - Sales Automation
   - Data-Driven Strategy
   - Platform Implementation

   **🤖 AI** (should show 2 cards):
   - Cloud Solutions
   - AI Commercialization

   **☁️ Cloud** (should show 2 cards):
   - Cloud Solutions
   - Platform Implementation

   **📈 Analytics** (should show 4 cards):
   - CRM & Analytics
   - Strategic Consulting
   - Data-Driven Strategy
   - (4th card check)

3. **Filter Animation**
   - Cards should fade out smoothly
   - Filtered cards appear with stagger (80ms delay each)
   - No layout jumping

#### ✅ Card Interactions
1. **Hover Effects**
   - Card lifts up (-8px)
   - Border changes to blue
   - Shadow + glow appears
   - Smooth transition

2. **Skill Tags**
   - Hover over individual tags
   - Tag background changes to blue
   - Text becomes white
   - Slight lift

3. **Icon Circles**
   - Each card has 64px icon circle
   - Gradient background
   - Different emoji per card

#### ✅ Responsive Design
1. **Mobile (< 768px)**
   - Single column
   - Filter buttons may wrap
   - Full-width cards

2. **Tablet (768px - 1024px)**
   - 2-column grid
   - Filter bar in one row

3. **Desktop (> 1024px)**
   - 3-column grid
   - All filters visible

---

## 3️⃣ Timeline/Experience Testing

### Location
**Page:** `experience.html`  
**Element:** Timeline with work history

### What to Test

#### ✅ Visual Layout

**Desktop (> 768px):**
1. **Timeline Line**
   - Vertical gradient line in center
   - Blue at top → Teal at bottom

2. **Alternating Cards**
   - 1st card: LEFT side
   - 2nd card: RIGHT side
   - 3rd card: LEFT side
   - Pattern continues

3. **Timeline Markers**
   - Circle markers on the center line
   - Blue border, white center
   - Light blue shadow ring

**Mobile (< 768px):**
1. **Timeline Line**
   - Moves to LEFT side (20px from edge)

2. **Cards**
   - All cards aligned LEFT
   - Stacked vertically
   - Full width

#### ✅ Interactive Elements

1. **Marker Hover**
   - Hover over any timeline marker
   - Should scale to 1.3x
   - Border changes to teal
   - Glow effect appears

2. **Card Hover**
   - Hover over any card
   - Card lifts up (-4px)
   - Border changes to blue
   - Enhanced shadow

3. **Details Expand/Collapse**
   - Click "View Details & Achievements"
   - Arrow rotates (▶ → ▼)
   - Content slides open
   - Click again to collapse

#### ✅ Content Elements

1. **Time Badges**
   - Teal pill-shaped badges
   - Format: "Month Year – Present/Month Year"

2. **Company Badges**
   - 🏢 Nonprofit
   - 🚀 Enterprise Tech
   - Appears below company name

3. **Checkmark Bullets**
   - Green ✓ checkmarks
   - Strong numbers in highlights
   - Example: "Led **20+ care managers**"

4. **Skill Tags**
   - Blue tags at bottom of details
   - Light blue background
   - Rounded corners

#### ✅ Scroll Animations
1. **Load Page**
   - Timeline items invisible initially

2. **Scroll Down**
   - Items fade in as they enter viewport
   - Each item appears sequentially
   - Stagger delay between items

---

## 4️⃣ Automation Lab Dashboard Testing

### Location
**Page:** `automation-lab.html`  
**Element:** Header, tabs, KPI cards

### What to Test

#### ✅ Header Section
1. **Gradient Background**
   - Animated gradient (blue → light blue → teal)
   - Shifts slowly (8 seconds per cycle)
   - Same animation as homepage hero

2. **Text Styling**
   - White text with shadows
   - "Automation Lab" title
   - Subtitle underneath

#### ✅ Segment Tabs (Pill-Shaped)
1. **Container**
   - Glass-morphism effect
   - White semi-transparent (15% opacity)
   - Backdrop blur
   - Rounded pill shape

2. **Tab Buttons**
   - 4 tabs: All Solutions, Salesforce, Power BI, Automation
   - "All Solutions" active by default

3. **Active State**
   - White background
   - Blue text
   - Shadow underneath
   - Pill-shaped

4. **Inactive Hover**
   - White 15% background
   - White text
   - Smooth transition

5. **Click Behavior**
   - Click different tab
   - Active state moves smoothly
   - Previous tab returns to inactive state

#### ✅ KPI Cards
1. **Top Border Animation**
   - On page load / scroll into view
   - 4px gradient bar animates left to right
   - Blue → Teal gradient
   - 500ms animation

2. **Gradient Values**
   - Large numbers (e.g., "$12.4M")
   - Blue-to-teal gradient text
   - Bold font

3. **Hover Effect**
   - Card lifts (-4px)
   - Border changes to blue
   - XL shadow + glow
   - Smooth transition

4. **Icons**
   - Each card has emoji icon
   - 💰 💡 ⚡ ⏱️ etc.
   - Left side of card

5. **Change Indicators**
   - "+24% vs Q3" style badges
   - Green background for positive
   - Small pill-shaped badge

#### ✅ Responsive Grid
1. **Mobile (< 640px)**
   - Single column
   - Stacked KPI cards

2. **Tablet (640px - 1024px)**
   - 2-column grid

3. **Desktop (> 1024px)**
   - 4-column grid

---

## 🎨 Visual Polish Checks

### Across All Pages

#### ✅ Animations
- [ ] All animations smooth (60fps)
- [ ] No jank or stuttering
- [ ] Transitions feel natural
- [ ] Loading doesn't cause layout shift

#### ✅ Colors & Gradients
- [ ] Primary blue: #014B8C (deeper than before)
- [ ] Accent teal: #1B8B7E (for CTAs)
- [ ] Gradients smooth and professional
- [ ] Text legible on all backgrounds

#### ✅ Spacing & Layout
- [ ] Consistent spacing throughout
- [ ] No elements touching
- [ ] Proper hierarchy
- [ ] Clean alignment

#### ✅ Typography
- [ ] Headers stand out
- [ ] Body text readable
- [ ] Line height comfortable
- [ ] Font weights create hierarchy

---

## 🐛 Common Issues & Fixes

### Issue: Headlines not rotating
**Check:**
- JavaScript console for errors
- Network tab: `dynamic-headline.js` loaded?
- Reduced motion setting (feature, not bug)

### Issue: Skills filter not working
**Check:**
- Console errors
- `skills-filter.js` loaded?
- Filter buttons have `data-category` attribute?
- Cards have `data-categories` attribute?

### Issue: Timeline not alternating
**Check:**
- Screen width > 768px?
- CSS loaded completely?
- Timeline items have `.timeline-item` class?

### Issue: Automation lab tabs not styled
**Check:**
- `automation-lab.css` loaded?
- Tabs have correct structure?
- Browser supports backdrop-filter? (may not work in older browsers)

---

## ✅ Final Checklist

### Homepage
- [ ] Headline rotates through 5 versions
- [ ] Skills filters work (all 6 buttons)
- [ ] All 9 skill cards display correctly
- [ ] Filter animations smooth
- [ ] Card hovers work
- [ ] Mobile responsive

### Experience Page
- [ ] Timeline line visible
- [ ] Cards alternate (desktop)
- [ ] Markers hover/scale
- [ ] Details expand/collapse
- [ ] Scroll animations trigger
- [ ] Mobile layout correct

### Automation Lab
- [ ] Header gradient animates
- [ ] Pill tabs style correctly
- [ ] Tab switching works
- [ ] KPI top borders animate
- [ ] Card hovers work
- [ ] Grid responsive

### Cross-Browser
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (desktop & iOS)
- [ ] Mobile Chrome (Android)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Reduced motion respected
- [ ] Screen reader compatible
- [ ] ARIA attributes correct

### Performance
- [ ] Page loads < 3 seconds
- [ ] Animations smooth (60fps)
- [ ] No console errors
- [ ] No console warnings
- [ ] Lighthouse score > 90

---

## 🎉 Success Criteria

**Phase 2 is successful if:**

✅ Headlines rotate smoothly every 4 seconds  
✅ Skills can be filtered by 6 categories  
✅ Timeline has modern alternating design  
✅ Automation Lab has pill-shaped tabs  
✅ All hover effects work smoothly  
✅ Mobile layouts are perfect  
✅ Animations respect reduced motion  
✅ No JavaScript errors in console  
✅ All pages load and function correctly  
✅ Users say "Wow!" when they see it 😊

---

**Happy Testing!** 🚀

If all items check out, Phase 2 implementation is rock solid!
