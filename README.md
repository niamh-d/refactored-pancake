# KØdo (Niamh Doyle MVP)

## What

Fullstack MVP project using React, React Router, Tailwind CSS, Daisy UI and Material Icons in the frontend and Express and MySQL in backend.

## Concept

KØdo (from Estonian kodu 'home' + English 'do') is pitched as a homelife management solution for busy parents, to facilitate caring for their children via the sharing of important information on the children in the family between guardians, be they primary guardians, extended family guardians (such as grandparents), or temporary guardians (e.g. neighbours, friends).

The idea is for it to be a convenient tool to allow for scheduling of family life and storing of key data points, such as contact information of the children's schools and doctors, child dietary requirements and likes, upcoming appointments and events etc.

## Functionality

### Present functionality

- Sign up as a new user
- Create a family as an admin user
- Edit profile details
- Add children and invite other users guardians to your family
- Send and accept / decline invites

### Not presently-possible functionality (but possible to do)

- Remove guardians
- Provide other guardians access to only speciifc views
- Edit child details
- Add information on your child's school, teacher, doctor, diet, etc.
- Scheduling
- Sending reminders by SMS/email/WhatsApp

## Pages

### Homepage & login

Homepage as seen by logged-out visitors

![Homepage for logged out vistors](./imgs/pages/homepage.png)

Homepage as seen by logged-in users

![Homepage for logged in users](./imgs/pages/homepage-loggedin.png);

Login screen

![Login screen](./imgs/pages/login.png);

Sign up

![Sign up screen](./imgs/pages/signup.png);

### Inner App

The inner app, which a user gets access to upon successful sign in. Allows user to navigate to a number of views. Only the profile, admin, and family views have been built out so far.

![Inner app nav](./imgs/views/inner-app-nav.png)

#### Profile

![Profile view](./imgs/views/profile.png);

#### Admin view

![Admin view](./imgs/views/admin-view.png);

#### Family view

![Family view](./imgs/views/family-view.png);

## Functionality

### Invites

Invite banner notification as seen from the invitor's side

![Invite from invitor side](./imgs/views/family-view-invitor.png);

Invite banner notification as seen from the invitee's side

![Invite from invitee side](./imgs/views/family-view-invitee.png);

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
