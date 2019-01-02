**Date: 01.11.2018**

## Executive Summary
The start phase of the project was challenging since it includes creating and organizing small teams,choosing technologies, training of the team members, installation and setup processes of necessary programs. It took a considerable time to begin working on the project in terms of implementation. The overhead due to initialization process causes creating less as a last product for the customer. Profile page, desktop web design and building Android app are obvious missing points in this milestone. However, we are able to show the basic logic of the platform. We also initially planned to develop comments in this milestone but we couldn't make it in time.

We are planning to continue by profile page, comments, multimedia usage etc.

## Status of Deliverables
|Deliverable|Status|
| ------ | ------ |
|Authentication with JWT|Completed|
|Create user and event models and APIs|Completed|
|Sign In, Sign Up Pages|Completed|
|Feed page|Completed|
|Event Detail & Creation Page|Completed|
|User Profile Page|Not Complete|
|Desktop Web Design|Not Complete|
|Building Android App|Not Complete|
|Comments|Not Complete|
|NodeJS Architecture Design and Setup|Completed|
|Ionic Architecture Design and Setup|Completed|
|Deployment|Completed|

## Evaluation of the status of Deliverables

#### Backend Structure
In backend, we desire to have a concise as well as flexible architecture enabling creating models for abstraction of data and dividing the code into modules via controllers. The current architecture is, for now, sufficient for creating our event share platform, Actopus. Moreover, all the backend deliverables are successfully completed in this milestone. For the next milestones, the prepared structure will help us to extend the code.

#### Frontend Structure
In frontend, we designed a very comprehensive architecture in terms of performance issues that will arise in the near future, being scalable and modularity. 

### User Experience

### Ionic Cordova Build

## Summary of Coding Work Done


| Person | Coding Summary |
| ------ | ------ |
| Didem Öngü | - |
| Kemal Tulum | - |
| Oğuz Kaan Yüksel | Frontend Authentication & Data Services, Frontend-Backend integration, Frontend routing & feature modularization: Non-UI frontend base system |
| İlyas Demirkıran | - |
| Gökhan Tekel | - |
| Özgür Akaoğlu | Event Data Model Delete Route, Authentication with JWT |
| Ümit Yolcu | Event Data Model Route / Controller Creation |
| Yusuf Kalaycı | User Model Signin Route / Session Control |
| Nazmican Çalık | Backend server initial structure, initial code with User Data model and route, JWT Authentication, Database Setup, mLab and Heroku Continuous Deployment |
| Serkan Özel | Event detail page and event create page: Initial event creation and posting code, event retrieval from backend and showing part, some part of JWT authentication control in other pages like feed and event detail|
## Requirements

### 1. Functional Requirements

#### 1.1. User Requirements

<ul>
<details>
<summary> <strong>1.1.1. Guests</strong> </summary>
<br>

* **1.1.1.1.** Guests shall be able to see events created by the members.
* **1.1.1.2.** Guests shall not post any comments.
* **1.1.1.3.** Guests shall not create events.
* **1.1.1.4.** Guests shall be able to search for public content. 
* **1.1.1.5.** Guests shall not be able to vote on anything.
* **1.1.1.6.** Guests shall see the Trending page instead of Feed page when they open the system.
* **1.1.1.7.** Guests shall not be able to mark attendance information about events.

</details>
<br>
<details>
<summary> <strong>1.1.2. Authentication</strong> </summary>

* **1.1.2.1. Sign Up**
  * **1.1.2.1.1.** The users shall sign up by providing an appropriate password, an e-mail address and a unique username to the system.
  * **1.1.2.1.2.** Users shall be able to Sign Up via their Facebook accounts.


* **1.1.2.2. Sign In**
  * **1.1.2.2.1.** Users shall enter their username and password to login to the system.
  * **1.1.2.2.2.** Users shall have the option to Sign in via their Facebook account.
  * **1.1.2.2.3.** Users shall have an option to reset their password.

</details>
<br>
<details>
<summary> <strong>1.1.3. Profile</strong> </summary>

* **1.1.3.1. Personal**
  * **1.1.3.1.1.** Users shall have a profile page which includes their information. (name, surname, date of birth, nationality)
  * **1.1.3.1.2.** Users shall be able edit their activity preferences.
  * **1.1.3.1.3.** Users shall have the choice between showing the activities they will attend or that they have attended in their profile page.

* **1.1.3.2. Settings**
  * **1.1.3.2.1.** Users should be able to select whether they want to take notification or not.
  * **1.1.3.2.2.** Users should be able to configure their privacy settings. 

* **1.1.3.3. Timeline**
  * **1.1.3.3.1.** Users shall be able to create events by providing necessary inputs(date,description,type,tag etc).
  * **1.1.3.3.2.** Users shall be able to see past events that they attended.
  * **1.1.3.3.3.** Users shall be able to post comments on events which they attended.
  * **1.1.3.3.4.** Users shall be able to share particular events.
  * **1.1.3.3.5.** Users shall be able to post photos by tagging certain events.
  * **1.1.3.3.6.** Users shall be able to get notifications from certain events.
 
</details>
<br>
<details>
<summary> <strong>1.1.4. Feed</strong> </summary>
<br>

* **1.1.4.1.** Users shall come across first with the feed page when they open the web site or mobile application.
* **1.1.4.2.** Users can see recent created events in the feed section.

</details>
<br>
<details>
<summary> <strong>1.1.5. Communication</strong> </summary>
<br>

* **1.1.5.1.** Users shall be able to follow to vote a user and send a personal message to each
other.
* **1.1.5.2.** Users shall be able to block other people. 
* **1.1.5.3.** Blocked users shall not be able to follow the user who blocks her/him.
* **1.1.5.4.** Blocked users shall not be able to attend any activity organized by the blocker user.

</details>
<br>
<details>
<summary> <strong>1.1.6. Events</strong> </summary>

* **1.1.6.1. Contribution**
  * **1.1.6.1.1.** Users shall be able to create pages for already passed events.
  * **1.1.6.1.2.** Users shall be able to create pages for future events.


* **1.1.6.2. Tagging**
  * **1.1.6.2.1.** Users shall be able to attach a tag to the posts they created.
    * **1.1.6.2.1.1.** Some predetermined tags shall be provided by the system.
        * **1.1.6.2.1.1.1** The predetermined tags are art, technology, culture, music, sport and speech.
    * **1.1.6.2.1.2.** Users shall be able to create their own tag if they prefer.
    
  

* **1.1.6.3. Attendance**
    * **1.1.6.3.1.** Users shall be able to mark upcoming events as will attend, may attend or won't attend.
    * **1.1.6.3.2.** Multiple people can attend an event using one account by selecting attendance number at event page.

* **1.1.6.4. Voting**
  * **1.1.6.4.1.** User shall be able to vote the events with 5 star rating system.

 

* **1.1.6.5. Annotation**
    * **1.1.6.5.1.** Users shall be able to annotate the event information and multimedia that may have been added to an event page. 
        * **1.1.6.5.1.1** Users shall be able to annotate text formatted files.
        * **1.1.6.5.1.1** Users shall be able to annotate links.
        * **1.1.6.5.1.2** Users shall be able to annotate geographical references/places.

* **1.1.6.6. Pricing** 
    * **1.1.6.6.1** Users shall be able to see the price of every event.

* **1.1.6.7 Location and Time** 
    * **1.1.6.7.1** Location supported by the Google Maps API shall be included in every event.
    * **1.1.6.7.2** Time of the event shall be very strict and definite in terms of date, hour and minutes.
    * **1.1.6.7.3** Users can set duration of the event.

</details>
<br>
<details>
<summary> <strong>1.1.7. Searching</strong> </summary>
<br>

* **1.1.7.1.** Users shall be able to search with _Semantic_, _Content_ and _Location_ options.
* **1.1.7.2.** User should be able to filter the events in a city or district.
* **1.1.7.3.** Users should be able to search for other users.

</details>
<br>
<details>
<summary> <strong>1.1.8. Verification</strong> </summary>
<br>

* **1.1.8.1.** Famous people,groups or cooperations(teams,communities etc.) should be able to verify their accounts.

</details>
<br>
<details>
<summary> <strong>1.1.9. Comments</strong> </summary>
<br>

* **1.1.9.1** Users shall be able to upvote/downvote the comments.

</details>
<br>
<details>
<summary> <strong>1.1.10. Admin Panel</strong> </summary>
<br>

* **1.1.10.1.** The system should provide an admin panel for admins with privileged rights
  * **1.1.10.1.1** An admin should be able to delete or edit events.
      * **1.1.10.1.1.1** An event should be deleted when it contains illegal contents in 1.1.10.1.2.2.
      * **1.1.10.1.1.2** An event should be deleted when it is not an actual event but used for another purpose like advertisement.
      * **1.1.10.1.1.3** An event should be blocked for a day when it contains illegal contents in 1.1.10.1.2.2. This is for user to change the content without removing the event.
  * **1.1.10.1.2** An admin should be able to block a user from logging a specific amount time.
      * **1.1.10.1.2.1** A member user should be blocked for a day when he or she spams messages and disturbs other users.
      * **1.1.10.1.2.2** A member user should be blocked for an appropriate time based on what he or she has done when he or she sends illegal contents like pornography, criminal activities.
  * **1.1.10.1.3** An admin should be able to view emails came from users. 
       * **1.1.10.1.4** An admin should be able to respond the emails. The admin shall respond in 2 days.
  * **1.1.10.1.4** Admins should be able to verify celebrities and well known users.

</details>
</ul>

### 1.2. System Requirements

<ul>
<details>
<summary> <strong>1.2.1. Search</strong> </summary>
<br>

* **1.2.1.1.** System will search content based on search type
    * **1.2.1.1.1** If semantic search is selected, system will bring related events depending on tags of events.
    * **1.2.1.1.2** If content search is selected, system will bring exact matches in usernames and event names. 
    * **1.2.1.1.3** If location search is selected, system will bring events which are in the location.
    * **1.2.1.1.4** If top search is selected, System will search information that are mixture of the other three options based on their popularity.
* **1.2.1.2.** System should sort search results according to the criteria given in 1.2.3.

</details>
<br>
<details>
<summary> <strong>1.2.2. Recommendation</strong> </summary>
<br>

#### 1.2.2. Recommendation 
* **1.2.2.1.** The system shall recommend events to the users, based on the followed users, activity preferences and events attended.

</details>
<br>
<details>
<summary> <strong>1.2.3. Ranking</strong> </summary>
<br>

* **1.2.3.1.** The system shall provide a way for the user to see "Trending" events.
* **1.2.3.2.** The ranking procedure shall be calculated according to number of attendees, votes of an event, number of views of an event, and remaining time to an event.
* **1.2.3.3.** The user should be able to filter the process. That is, the user should be able to see the top events ranked according to any non-empty subset of the parameters stated in 

</details>
<br>
<details>
<summary> <strong>1.2.4. Admin Feature</strong> </summary>
<br>

* **1.2.4.1** System shall be able to handle all operations stated in 1.1.10.

</details>
<br>
<details>
<summary> <strong>1.2.5. Annotations</strong> </summary>
<br>

* **1.2.5.1** Annotations shall be retrieved by the system when a page with annotations is opened
* **1.2.5.2** Annotations shall be stored in the system
* **1.2.5.3** System shall test the annotations to assure validity.
* **1.2.5.4** System shall allow text formatted annotation.
* **1.2.5.5** System shall allow image and a description message formatted annotation.
* **1.2.5.6** System shall geographical references using Google Map API.
* **1.2.5.7** System shall  allow links to other web pages.

</details>
<br>
<details>
<summary> <strong>1.2.6. Events</strong> </summary>
<br>

* **1.2.6.1** System shall store events attendance information
* **1.2.6.2** System shall store attendance information for passed events, either attended or not.
* **1.2.6.3** System shall store attendance information for upcoming events.
    * **1.2.6.3.1** It can be "will attend".
    * **1.2.6.3.2** It can be "may attend".
    * **1.2.6.3.3** It can be "won’t attend".
* **1.2.6.4** System shall store attendance information for already passed events.
    * **1.2.6.4.1** It can be "attended".

</details>
<br>
<details>
<summary> <strong>1.2.7. Database</strong> </summary>
<br>

*  **1.2.7.1** System shall be able to store data in the database
    * **1.2.7.1.1.** System shall be able to store event tags to sort sematic search results.
    * **1.2.7.1.2** System shall be able to retrieve past event history of a user in events page.
*  **1.2.7.2** System shall be able to update data in the database
*  **1.2.7.3** System should do an integrity check once a week to prevent data loss.

</details>
<br>
<details>
<summary> <strong>1.2.8. Voting</strong> </summary>
<br>

* **1.2.8.1** System shall be able to store voting data.
* **1.2.8.2** System shall be able to retrieve voting data.
* **1.2.8.3** Followers/Follows/Blocks Information
    * **1.2.8.3.1** System shall hide user information between the users if one of them blocks the other.
    * **1.2.8.3.2** System should be able to show the number followers and the number of users followed by the user.
    * **1.2.8.3.3** System should show number of followers of a user while searching.
* **1.2.8.4** Events
    * **1.2.8.4.1** System shall sort searching results according to like numbers of the events.
* **1.2.8.5** Comments
    * **1.2.8.5.1** System should hide comments which are disliked by more than 10 users.

</details>
<br>
<details>
<summary> <strong>1.2.9. Notification</strong> </summary>
<br>

* **1.2.9.1** In home page there shall be a part for notifications.
* **1.2.9.2** Notifications is sent under these circumstances
     * **1.2.9.2.1** System should send notification including upcoming event information of the events which a user has indicated that he or she will attend.
     * **1.2.9.2.2** System should send notification to event owner if somebody comments on event page. 
     * **1.2.9.2.3** System should send notification to users if somebody comments under their comment.
     * **1.2.9.2.4** System should send notification to users if somebody follows them.
*  **1.2.9.3** Mobile version shall send notifications to users from notifications panel.

</details>
<br>
<details>
<summary> <strong>1.2.10. Account</strong> </summary>
<br>

* **1.2.10.1** A confirmation e-mail shall be send by system to complete the sign up.
* **1.2.10.2** System shall provide remember me option for username and password.
* **1.2.10.3** System hides users' information to other users if privacy activated.

</details>
<br>
<details>
<summary> <strong>1.2.11. Feed</strong> </summary>
<br>

* **1.2.11.1** The content of the feed shall depend on the owner account.
  * **1.2.11.1.1** Feed shall include the approaching events created or attended by the users followed by the owner.
  * **1.2.11.1.2** Feed should include the events that the owner might interest. (The details are under Recommendation)
  * **1.2.11.1.3** Feed should include the events that are sponsored by verified users.(Paid advertising business model)
* **1.2.11.2** Feed shall be updated  whenever a new event is ready.
* **1.2.11.3** Feed should bring new content when user presses a button in the feed page.

</details>
</ul>

### 2. Nonfunctional Requirements

<ul>
<details>
<summary> <strong>2.1. Accessibility</strong> </summary>
<br>

* **2.1.1.** The system shall be accessible on Android and web platforms.
* **2.1.2.** The system shall be compatible with popular Android devices and web browsers.
* **2.1.3.** The web platform shall be responsive to screen sizes with various sizes.
* **2.1.4.** The system's default theme shall be modifiable to night, day and color-blindness themes.

</details>
<br>
<details>
<summary> <strong>2.2. Availability</strong> </summary>
<br>

* **2.2.1.** The system will be available to users for 24 hours every day.(Except during maintenance or unexpected errors.)
* **2.2.2.** The system should have a mean time to failure of at least 1 year.
* **2.2.3.** The system shall achieve 99.5% uptime.
* **2.2.4.** Starting of the maintenance hours, the system shall notify present users about the expected termination time of maintenance.
* **2.2.5.** The system should be available to existing Facebook users.

</details>
<br>
<details>
<summary> <strong>2.3. Reliability/Survivability</strong> </summary>
<br>

* **2.3.1.** An update process of an item shall start all related updates again if any update fails to commit.
* **2.3.2.** The system storage shall be checked regularly and should be increased whenever necessary in order for the system to continue storing new data without losing any of the old.
* **2.3.3.** The system shall take regular backups of its database every two weeks.
* **2.3.4.** The system shall produce a proper log file in any occurrence of an unexpected error for fixing and recovering purposes.
* **2.3.5.** After each unexpected error, the system should be able to return back at least the latest database backup time.
* **2.3.6.** The system shall produce an occasional log file, once the 70% memory capacity threshold is exceeded.

</details>
<br>
<details>
<summary> <strong>2.4. Performance/Efficiency</strong> </summary>
<br>

* **2.4.1.** The system shall respond to requests in 1 second.
* **2.4.2.** The system should support up to 200 requests per second.
* **2.4.3.** System restart cycle shouldn't exceed 5 minutes.
* **2.4.4.** Any interaction between user and interface will be last at most 3 seconds.
* **2.4.5.** At least, %20 of the system's processing capacity will be available during peak load hours.
* **2.4.6.** The Android client should be loaded and ready to use in at most 5 seconds.
* **2.4.7.** The system should be able to serve up to 1000 concurrent users.

</details>
<br>
<details>
<summary> <strong>2.5. Integrity</strong> </summary>
<br>

* **2.5.1.** All numeric amounts shall be accurate to two decimal points.
* **2.5.2.** Consistency between latest back-up and system will be checked once in a week.
* **2.5.3.** In case of any inconsistency between incoming requests and database, the operation related to the request should be terminated.
* **2.5.4.** After the termination of a request, state of the database should be restored in case of changes in databases.
* **2.5.5.** An occasional log file should be generated once any inconsistency occurs.
* **2.5.6.** All log files' syntax should be consistent with each other. Thereby not allowing any confusion.

</details>
<br>
<details>
<summary> <strong>2.6. Security</strong> </summary>
<br>

* **2.6.1.** Users shall be forced to change their password each year after signing up or latest password change.
* **2.6.2.** After 5 unsuccessful login attempts, another try should be possible after 10 minutes has passed.
* **2.6.3.** The user will be notified via an e-mail about exceedance of 5 unsuccessful login attempts.
* **2.6.4.** User shall be notified about changes of a profile, personal information and password via an e-mail.
* **2.6.5.** The application is web-based, therefore it should have SSL certificate.
* **2.6.6.** The system should deny the requests if the request limit is breached.
* **2.6.7.** The system shall escape any user-supplied input to prevent SQL Injection Attacks and XSS attacks.
* **2.6.8.** Users shall be prevented to construct his/her password with well-known public pieces of information such as his name, birthday.
* **2.6.9.** The system shall throw an inactivity timeout if no action is taken by the user for a specific time.
* **2.6.10** Passwords shall not be shorter than 8 characters and include both non-numeric characters and numbers.
 
</details>
<br>
<details>
<summary> <strong>2.7. Privacy</strong> </summary>
<br>

* **2.7.1.** The system shall guarantee the security of user data including personal information and passwords.
    * **2.7.1.1** User privacy format can be in one of the two options.
        * **2.7.1.1.1** Profile details can be seen by everyone (public)
        * **2.7.1.1.2** Profile details can only be seen by the followers
* **2.7.2.** The password of a user shall not be visible at any point in time. In case of password loss, the user shall be provided a link which enables construct him/her to a new password.
* **2.7.3.** Against web bots, the system should have reCaptcha human verification tools.
* **2.7.4.** In login page of the web and Android application, the password shall not be visible unless the user chooses otherwise.

</details>
<br>
<details>
<summary> <strong>2.8. Database</strong> </summary>
<br>

* **2.8.1.** Any password of personal information about a user shall be encrypted before being put in the database.
* **2.8.2.** Database architecture should allow fast operations to reduce latency.
* **2.8.3.** Periodic backups shall be taken to ensure data is safe and sound.

</details>
<br>
<details>
<summary> <strong>2.9. Annotations</strong> </summary>
<br>

* **2.9.1.** The W3C Web Annotation Protocol shall be used to store annotations.
* **2.9.2.** The annotations should be stored and retrieved in accordance with the protocol
* **2.9.3.** Annotations shall be stored and retrieved with an API that is compliant with the standard
* **2.9.4.** The annotations should be tested to assure validity. 
* **2.9.5.** JSON-LD should be used for annotation representation as described in the W3C documentation.

</details>
<br>
<details>
<summary> <strong>2.10. Robustness</strong> </summary>
<br>

* **2.10.1.** In case of failure, the system should have a recovery time of at most 30 minutes.
* **2.10.2.** Any errors and exceptions encountered will be handled if possible. Proper error message shall be produced for each occurrence of such events.

</details>
<br>
<details>
<summary> <strong>2.11. Version</strong> </summary>
<br>

* **2.11.1.** The application should be support XX or higher android version.
* **2.11.2.** The application should be launched XX or higher android version.

</details>
<br>
<details>
<summary> <strong>2.12. Localization</strong> </summary>
<br>

* **2.12.1.** The system will be accessible by native Turkish, English and French users.

</details>
<br>
<details>
<summary> <strong>2.13. Voting</strong> </summary>
<br>

* **2.13.1** Number of collected votes shall define the popularity of comments.

</details>
<br>
<details>
<summary> <strong>2.14. Location</strong> </summary>
<br>

* **2.14.1** The location of an event should be provided by Google Maps API.
   * **2.14.1.1** Android application of the system shall provide compatibility with Google Maps application.
   * **2.14.1.2** Web client of the system shall embed a Map in its body.

</details>
</ul>

## Design
We have designed our application to behave as a full stack multi-platform application. Our application has 2 platforms: **Mobile application** and **Web Application**.
They both share the same database on the backend side. One server for our application serves the database and necessary CRUD operations via api. We are using ionic framework for frontend and mobile application. Our backend serves the static files that ionic framework creates and also serves api endpoints under /api route. We used a nosql database (mongodb) fot the application. Also, we have created a continuous deployment using heroku services. We are planning to create CRUD operations for all data models and also create search and recommendation engines to make the platform more interactable.
## Project Plan
## Code structure and Group Process
**Teams, Workflow and General Overview** In the project we have two main teams. One for frontend and one for backend. 
We have two types of meetings: 
- One for sprint meetings (Where all team meets)
- The other is for sub-team meetings.(i.e. frontend meeting)

Our root repository holds both backend and frontend stack together. We have one main branch for code development and production, which is master. Each task is solved/carried out under feature branches, and then they are deleted. For example: If authentication is a feature, the developer opens a new branch for the feature and works there. After completing the feature s/he opens a pull request and merges the feature to master if it is accepted.(Rebase strategy is used) We have an automated pr checker (codacy bot) for conventions and better pull requests.

**User Stories and Tasks:** Each task corresponds to a user story. At the sprint meetings we decide about the main tasks and user stories. After that user stories are created as issues on the github. Then assigned to backend or frontend team leaders. After that team leaders decide about the technical specific tasks and assigns them to team members. This is the main workflow that we follow.

**Folder Structure and Deployment:** Backend and frontend teams works under their corresponding folders, which are seperated under the repository. In the main project root. We have another package.json which is the entry point for our node environment. When there is a push to master (a successfull pull request), heroku installs the dependencies recursively in both backend and frontend folders. After getting the dependencies, it builds the frontend and starts up the backend server which serves the static frontend and api routes.

**Branch Naming Convention:** We use the following format for branch naming: 
- [task-type]/[platform]/[name or desc of the task] __for example:__ feature/backend/auth
- [feature|refactor|bug|test]/[backend|frontend|deployment]/[descriptive-name]


## Evaluation of Tools and Managing the Project
### Tools
We are using several tools for different areas of our development process from communication to code quality.
* **Communication:** We try to use github issues as a platform to distribute the tasks. In order to make it efficient we use labels. Also, for urgent issues we use whatsapp.
### Development (Frameworks/Stack)
1) **Frontend**
    *  Ionic: We use ionic for hybrid android and web application frontend. 
2) **Backend**
    * NodeJs: Nodejs is our server side strategy for this application. We use express framework for the backend. Express is very handy for api and basic server development.
    * Mongo Db: We are using mongodb nosql database to hold our models and all kinds of data. After a discussion we decided that using a nosql database would be much better for horizontal scaling.
    * Mongoose: Mongoose is the npm package that we use for database object relation model. Mongoose makes it easy for us to interact with the database collections. (Save,delete,find etc.)
    * Passport Js: We use passport to handle the authentication, passport is a middleware npm package that can be used with different auth strategies (facebook, local, twitter etc), which makes the auth scalable.
    * mLab: Mlab is a cloud database hosting service. We use it to speed up development and also it makes database easily maintainable.
  
