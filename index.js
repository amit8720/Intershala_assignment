let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

    // update table data
    function updateTable() {
      const tableBody = document.getElementById("record-body");
      tableBody.innerHTML = '';

      // add rows to the table
      students.forEach(function (student, index) {
        const newRow = tableBody.insertRow();

        const cell1 = newRow.insertCell();
        const cell2 = newRow.insertCell();
        const cell3 = newRow.insertCell();
        const cell4 = newRow.insertCell();
        const cell5 = newRow.insertCell();

        // Set data
        cell1.textContent = student.id;
        cell2.textContent = student.name;
        cell3.textContent = student.phone;
        cell4.textContent = student.email;


        // Action button for edit
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        let editIcon = document.createElement("i");
        editIcon.className = "fa fa-edit left-margin";
        editButton.appendChild(editIcon);
        editButton.classList.add("edit-button");
        editButton.dataset.index = index; 

        // Action button for delete
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fa fa-trash left-margin";
        deleteButton.appendChild(deleteIcon);
        deleteButton.classList.add("delete-button");
        deleteButton.dataset.index = index;

        // Set button to ui
        cell5.appendChild(editButton);
        cell5.appendChild(deleteButton);
      });
    }

    updateTable();

    // listener for form submission (both create and update)
    document.getElementById("myForm").addEventListener("submit", function (event) {
      event.preventDefault(); 

      const userId = document.getElementById("userid").value;
      const name = document.getElementById("urName").value;
      const email = document.getElementById("userEmail").value;
      const phoneNum = document.getElementById("phoneNum").value;

      // alert for number validation
      if(phoneNum.length>10){
        alert("Phone number should be max 10 char only");
        return;
      }

      // Checking if editing existing record
      let editIndex = document.getElementById("submitBtn").dataset.editIndex;

      if (editIndex !== undefined) {
        // Update record
        students[editIndex].id = userId;
        students[editIndex].name = name;
        students[editIndex].email = email;
        students[editIndex].phone = phoneNum;

      } else {
        // Create record
        let student = {
          id: userId,
          name: name,
          email: email,
          phone: phoneNum,
        };
        students.push(student);
      }

      // Save to Local Storage
      localStorage.setItem('students', JSON.stringify(students));

      // Update the table with the new data
      updateTable();

      // Reset the form fields
      document.getElementById("myForm").reset();

      // Reset Action Buttons (hide cancel button)
      document.getElementById("cancelBtn").style.display = "none";
      document.getElementById("submitBtn").removeAttribute("data-edit-index");
      document.getElementById("submitBtn").textContent = "Submit";
    });

    // Listener for edit and delete buttons
    document.getElementById("Record").addEventListener("click", function (event) {
      let target = event.target;

      // Handle edit button click
      if (target.classList.contains("edit-button")) {
        let index = target.dataset.index;

        // Set form fields with selected student data
        document.getElementById("userid").value = students[index].id;
        document.getElementById("urName").value = students[index].name;
        document.getElementById("userEmail").value = students[index].email;
        document.getElementById("phoneNum").value = students[index].phone;

        // Update submit button for edit mode
        document.getElementById("submitBtn").textContent = "Update";
        document.getElementById("submitBtn").dataset.editIndex = index;

        // Show cancel button
        document.getElementById("cancelBtn").style.display = "inline-block";
      }

      // Handle delete button click
      if (target.classList.contains("delete-button")) {
        let index = target.dataset.index;

        if (confirm("Are you sure you want to delete this student record?")) {
          // Delete student record
          students.splice(index, 1);
          localStorage.setItem('students', JSON.stringify(students));
          updateTable();
        }
      }
    });

    // Listener for cancel button
    document.getElementById("cancelBtn").addEventListener("click", function (event) {
      // Reset form
      document.getElementById("myForm").reset();

      // Reset submit button and hide cancel button
      document.getElementById("submitBtn").textContent = "Submit";
      document.getElementById("submitBtn").removeAttribute("data-edit-index");
      document.getElementById("cancelBtn").style.display = "none";
    });