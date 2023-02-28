// GET REQUEST
function getTodos() {
  console.log('GET Request');
  //1st way
//   axios({
//     method:'get',
//     url:'https://jsonplaceholder.typicode.com/todos',
//     params:{// used when we want only specific data to get
// _limit:5
//     }
//   }).then(res=>showOutput(res))//adding promise
//   .catch(err=>console.log(err));

//2nd way
  //  axios.get('https://jsonplaceholder.typicode.com/todos',{params:{_limit:5}})
  //   .then(res=>showOutput(res))//adding promise
  // .catch(err=>console.log(err));

  //3rd way in this '?' is used as a param and ':' is replaced with "=" and by default axios is calling get reqyest
   axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then(res=>showOutput(res))//adding promise
  .catch(err=>console.log(err));
}

// POST REQUEST (SENDING DATA TO THE BACKEND)
function addTodo() {
  console.log('POST Request');

  //   axios({
  //   method:'post',
  //   url:'https://jsonplaceholder.typicode.com/todos',
  //   data:{// what data need to be sent 
  //     title:'new data 4',
  //     completed:false
  //   }
  // }).then(res=>showOutput(res))//adding promise
  // .catch(err=>console.log(err));

  //2nd way
  axios.post('https://jsonplaceholder.typicode.com/todos',
  {// what data need to be sent 
      title:'new data 6',
      completed:false
    }
  ).then(res=>showOutput(res))//adding promise
  .catch(err=>console.log(err));


}

// PUT/PATCH REQUEST 
//(PUT IS USED TO REPLACE THEENTIRE WITH NEW )
//PATCH IS USED TO UPDATE A APRTICULAR VALUE
function updateTodo() {
  console.log('PUT/PATCH Request');
  axios.put('https://jsonplaceholder.typicode.com/todos/1',//here 1 after todos is basicaaly the id which we want to replace with new data 
  //while if use patch it will change the value for the given thing attribute only 
  {// what data need to be sent 
      title:'new data 6',
      completed:false
    }
  ).then(res=>showOutput(res))//adding promise
  .catch(err=>console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
   axios.delete('https://jsonplaceholder.typicode.com/todos/3',//here 1 after todos is basicaaly the id which we want to delete
  ).then(res=>showOutput(res))//adding promise
  .catch(err=>console.log(err));
}

// SIMULTANEOUS DATA(USED TO FULLFILL VARIOUS REQUEST AND ONCE ALL REQUEST GET COMPLETED 
//ONLY THEN IT WILL RETURN JUST LIKE PROMISE.ALL and return result array)
function getData() {
  console.log('Simultaneous Request');
  axios.all([
       axios.get('https://jsonplaceholder.typicode.com/todos'),
       axios.delete('https://jsonplaceholder.typicode.com/todos/3')
  ]).then(res=>{//also we can use axios.spread()
    console.log(res[0]);
    console.log(res[1]);
    showOutput(res[0]);
  })
  .catch(err=>console.log(err))
}

// CUSTOM HEADERS (sending data to header i.e for authentication)
// use when u make a request to login u validate login and get back a token and need to send back token 
// in header to access protected route i.e websiets
function customHeaders() {
  const config={
    header :{// need to send data to header
'Content-Type':'application/json',
'Authorization':'sometoken'
    }
  };
  console.log('Custom Headers');
axios.post('https://jsonplaceholder.typicode.com/todos',
  {// what data need to be sent 
      title:'new data 6',
      completed:false
    },config
  ).then(res=>showOutput(res))//adding promise
  .catch(err=>console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
  const options={
    method:'post',
    url:'https://jsonplaceholder.typicode.com/todos',
    data:{
      title:'kjhjak'
    },
    transformResponse:axios.defaults.transformResponse.concat(data=>{
      data.title=data.title.toUpperCase();
      return data;
    })
  }
  axios(options).then(res=>showOutput(res));
}

// ERROR HANDLINGi.e 404 page 
function errorHandling() {
  console.log('Error Handling');
   axios.get('https://jsonplaceholder.typicode.com/todoss?_limit=5')
    .then(res=>showOutput(res))//adding promise
  .catch(err=>{
    if(err.response){
      console.log(err.response);
            console.log(err.response.status);
      console.log(err.response.data);

    }
  });

}

// CANCEL TOKEN to cancel request
function cancelToken() {
  console.log('Cancel Token');

  const source=axios.CancelToken.source();

axios.get('https://jsonplaceholder.typicode.com/todos',{
  cancelToken:source.token
})
    .then(res=>showOutput(res))
    .catch(thrown=>{
      if(axios.isCancel(thrown)){
        console.log('request cancelled');
      }
    })
}

// INTERCEPTING REQUESTS & RESPONSES
//used to get the time and reuqest we sent to the url i.e we are monitoring or intercepting
axios.interceptors.request.use(
  config=>{
console.log(`${config.method} is sent to ${config.url} at ${new Date().getTime()}`);
return config;
  },
  error=>{
    return Promise.reject(error);
  }
)

// AXIOS INSTANCES used anytime by creating it 
const axiosInst=axios.create({
  baseURL:'https://jsonplaceholder.typicode.com'
});

axiosInst.get('/comments').then(res=>showOutput(res));


// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
