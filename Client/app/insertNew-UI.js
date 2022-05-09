
import {Student} from '/campus.js'

console.log('Browser downloaded and about to execute the following logic.') 

const createBtn = document.getElementById('create')
let firstName = ''
createBtn.addEventListener('click', function(event){
	firstName = document.getElementById('fn').value
	const ln = document.getElementById('ln').value
	const dob = document.getElementById('dob').value
	const cwid = document.getElementById('cwid').value
	// console.log(`The value of first name: ${firstName} when create button is clicked`)	
	console.log(`Date of Birth: ${dob}`)
	const stObj = new Student(firstName, ln, new Date(dob), cwid)
	console.log(stObj) 
	
	// Set the Content-Type 
	const xhr = new XMLHttpRequest()
	xhr.open('POST', 'http://localhost:3000/api/students')
	xhr.setRequestHeader('Content-Type', 'application/json')
	xhr.responseType = 'json'
	xhr.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.response)
		}
	}
	// JSON encoding 
	const jsonStr = JSON.stringify(stObj)
	xhr.send(jsonStr)
	 
})

firstName = document.getElementById('fn').value
console.log(`The initial value of first name: ${firstName}`)


