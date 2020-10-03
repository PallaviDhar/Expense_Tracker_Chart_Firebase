let user_id = localStorage.getItem('userId');

let ref = firebase.database().ref('users/' + user_id);

let category = ['bills','grocery','medical','rent','house'];

let expenseCategory = [];
ref.on('value',function(snapshot){
	// console.log(snapshot.val());

	let data = snapshot.val();

	category.forEach(function (value){
	/*	alert(value);*/

		let amount = 0;

		//Run a loop  on snapshot
		for (let id in data){
			if(data[id].category === value){
				amount = amount + Number(data[id].amount);
			}
		}

		expenseCategory.push(amount);
	})
})


let mychart = document.querySelector('#bar_graph').getContext('2d');

let expenseChart = new Chart(mychart,{
	type:'bar',
	/*type:'line',
	type:'pie',*/
	data:{
		labels:category,
		datasets:[{
			label:'Category wise Expense',
			data:expenseCategory,
			backgroundColor:['#01f5c4','#fef305','#f501f1','#0122f5','#f33317']
		}]
	}
})