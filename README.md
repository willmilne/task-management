# task-management
A simple task management tool, intended to be used by one user.  

It's built using node.js on the server-side and react.js on the frontend.  

The server api works as follows: 

GET /tasks - returns the list of tasks as a dictionary indexed by id. 

    Its filter parameters are as follows: 
    
    ?filter=-1 returns all tasks
    
    ?filter=0 returns all tasks due today
    
    ?filter=1 returns all tasks due tomorrow
    
    ?filter=2 returns all tasks due today and tomorrow
    
    ?filter=3 returns all tasks that are overdue
    
    ?filter=4 returns all tasks that are completed
    
POST /tasks - allows the creation of a new task.  
    
    Body must contain the following fields: 
    
        name - string
        
        description - string
        
        due - a string formatted "M/D/YYYY"
        
PUT /tasks/:id - updates the task with the specified id.  
    
    Body must contain the following fields: 
        
        name - string
        
        description - string
        
        due - a string formatted "M/D/YYYY"
        
        completed - boolean
        
DELETE /tasks/:id - removes the task with the specified id
