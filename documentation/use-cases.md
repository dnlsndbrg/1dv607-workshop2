# Use cases

---

## 1 View compact list of members
The user wants to see a compact list of all the members

Precondition: The user is at the main menu
### Main scenario
1. The user selects the **List user** option
2. The user chooses **compact** list view
3. The system looks up all the member in the database
4. The system counts how many boats each member has registered
5. The system displays a compact list with the relevant information of each member

### Secondary Scenarios
**1.1 No members are registered**
1. The user selects the **List user** option
2. The user chooses **compact** list view
3. The system looks up all the member in the database but no members are registered
4. Information message is displayed

---

## 2 Create member
The user wants to add a new member

Precondition: The user is at the main menu
### Main scenario
1. The user selects **Register member**
2. The system displays a register member form
3. The user fills out all fields and submits the form
4. The system validates the input
5. The system adds a new member record in the database
6. The user is sent to the newly created members member page

### Secondary Scenarios
**2.1 The user fills out the form with invalid data**
1. The user selects **Register member**
2. The system displays a register member form
3. The user inputs incorrectly formatted data and submits the form
4. The system validates the input and finds a error
5. The system displays an error message that prompts the user to correct the mistake

**2.2 The user tries to register a already registered member**
1. The user selects **Register member** in the menu
2. The system displays a register member form
3. The user fills out all fields and submits the form
4. The system validates the input
5. The system tries to add a new member record in the database but finds that the unique personal number is already registered
6. The system displays an error message that tells the user that this member is already registered
