# Project Management Application

This is a web application (hosted at: https://project-manage-ment.herokuapp.com/) designed to let user maintain projects. 
Main operations include:
> - #### Creating/adding a new project:
>	- User is provided with a form in the home page where one can enter project details like project name, description, deadline and tech stack used in the project.
>	- When user fills in the details and clicks done, the data is added to database and user can see the new project added to the sidebar under Pending projects.
> 
> - #### Viewing project details:
>	- On the sidebar user can see two sections one named Pending projects and another Completed projects.
>	- Under any of the sections, names of the projects are mentioned. When clicked a modal opens mentioning the details corresponding to the project.
>
> - #### Editing project details:
>	- Only pending projects can be edited. Under the section pending projects there is an edit icon in front of each project.
>	- When the edit icon is clicked user is provided a modal with prefilled form with project details that can be edited accordingly.
>	- User can also mark a project to be complete from the same modal and when done is clicked project details are updated and if project was marked as complete it will be shifted to completed projects section.
>
> - #### Deleting project:
> 	- If user wishes to remove a project, they can do so by clicking the delete icon in front to each project in both sections.
> 	- When delete icon is clicked a modal is presented to confirm the deletion of project. If user clicks “yes” the project will be deleted and if user clicks “no” the deletion is cancelled.
