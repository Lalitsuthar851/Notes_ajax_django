function addeventlikebutton(){
    var buttons = document.querySelectorAll('.popup');
   console.log(buttons);
   $('.popup').each(function(){
         // $(this).click(function(){
           var buttonId = $(this).attr('id');
           $(this).hover(function() {
     var popup = document.getElementById("myPopup");
     popup.classList.toggle("show");
   })
           });
         }
   
   var token=sessionStorage.getItem("token");
   var user=sessionStorage.getItem('user');
   var user_id=sessionStorage.getItem('user_id');
   var media_url="http://127.0.0.1:8000"
   
   function addeventbutton(){
    var buttons = document.querySelectorAll('.del-button');
   console.log(buttons);
   $('.del-button').each(function(){
         $(this).click(function(){
           var buttonId = $(this).attr('id');
           $.ajax({
               url: `http://127.0.0.1:8000/note/api/${buttonId}`,
               type: 'DELETE',
               headers:{'Authorization': `Token ${token}`},
               success: function(data) {
                   console.log(data)
               },
               error: function(error) {
                   console.log('GET error:', error);   
               }
               });
           });})
         }
         
   $('#profile').click(
     function(){
     var cam_icon=document.getElementById("img_upload");
     if (cam_icon.style.display=='inline')
     {
   
       cam_icon.style.display='none';
     }
     else{
       cam_icon.style.display='inline';
       upload_icon();

     }
   }
   )
   function upload_icon(){
     var icon=document.getElementById("img_upload");
     if (icon.style.display=='inline'){
       $('#img_upload').click(function(){
         $('#fileInput').click();
         console.log($("fileInput").val(),',,,,,,,');
       })
     }
   }
   function upload_img(){
     // const fileInput = document.getElementById('fileInput');
     // fileInput.addEventListener('input', handleInputChange);
     // fileInput.addEventListener('submit', handleInputChange);
     $('#uploadbtn').click(function () {
               // if (fileInput.value != '') {
                 const selectedFile = fileInput.files[0];
                 Data={"profile_picture":selectedFile}
             // if (selectedFile) {
               console.log("test");
               // const formData = new FormData();
               // formData.append('profile_picture', selectedFile);
           //    data_image={   
           //   "profile_picture": fileInput.files[0]
               
           // }
           console.log(fileInput.files[0].name);
               $.ajax({  
               url: 'http://127.0.0.1:8000/note/api/profile',
               type: 'PUT',
               data:Data,
               headers:{'Authorization': `Token ${token}`},
               contentType: 'application/json',
               success: function(data) {
                   console.log(data)
               },
               error: function(error) {
                   console.log('GET error:', error);
               }
               });
               }
            )
   
   }
   upload_img();
   function logout(){
   $('#logoutbtn').click(
     function(){
     $.ajax({
               url: 'http://127.0.0.1:8000/note/api/logout',
               type: 'POST',
               headers:{'Authorization': `Token ${token}`},
               success: function(data) {
                 window.location.href = "login.html";
                 sessionStorage.removeItem('token');
           },
              error: function(error) {
                   console.log('GET error:', error);
               } });  
   })};
   
   function createtable(){
       var divs = document.querySelectorAll('.col-lg-12')[2];
           $.ajax({
               url: 'http://127.0.0.1:8000/note/api',
               type: 'GET',
               headers:{'Authorization': `Token ${token}`},
               success: function(data) {
                 var bg_color_list = ['dark', 'dark-light']; 
                 var color_decs_list =['cyan','yellow','orange'];
                 var images=["1357fb26e241e79.jpg","images.jpg"]
                 data.forEach(function(dt) {
                 
                   var bg_color = bg_color_list[(Math.random() * bg_color_list.length) | 0];
                   var desc_color = color_decs_list[(Math.random() * color_decs_list.length) | 0];
                   var imges_random=images[(Math.random() * images.length) | 0];
                   var newRow = document.createElement("div");
                   newRow.innerHTML=`
                   <div class=" tm-timeline-item">
                           <div class="tm-timeline-item-inner">
                               <img src="img/${imges_random}" alt="Image" class="rounded-circle tm-img-timeline">
                               <div class="tm-timeline-connector">
                                   <p class="mb-0">&nbsp;</p>
                               </div>
                               <div class="tm-timeline-description-wrap">
                                   <div class="tm-bg-${bg_color} tm-timeline-description">
                                       <h3 class="tm-text-${desc_color} tm-font-400">${dt.title.length>64?dt.title.slice(0,64)+'...':dt.title}</h3>
                                       <p>${dt.content.length>85?dt.content.slice(0,85)+'...':dt.content}</p>
                                       <p class="tm-text-yellow float-right mb-0">Created By: ${dt.username}</p>
                                       <p style='margin-right:8px;' class="tm-text-green float-right mb-0">${formatDate(dt.created_at)} </p>
                                        ${del_button_condition(dt)}
                                        <p style='margin-left: 70px;margin-right: 15px; margin-top: -30px;' id='like_status_${dt.id}'>${dt.likes.includes(parseInt(user_id))?
                                         '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>':
                                         '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>'}<span>${dt.likes.length}</span></p>
                                       </div>
                                                       
                               </div>
                               <div class="tm-timeline-connector">
                                   <p class="mb-0">&nbsp;</p>
                               </div>
                               <button id='view note${dt.id}' style='border:4px solid #404040  padding: 2px 15px; width: 173px; height: 50px; font-size:20px;'>view note<svg style="margin-left:5px;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg></button>
                           </div>
                           <div class="tm-timeline-connector-vertical"></div>
                       </div> 
                     <!-- The popup overlay and content -->
                     <div id="popup${dt.id}" class="overlay">
                       <div class="popup">
                         <h2 ${(user==dt.username)?'contenteditable="true"':''} id='pophead${dt.id}'>${dt.title}</h2>
                         <a class="close" href="#">&times;</a>
                         ${(user==dt.username)?'<button id="${dt.id}" class="save_note">save</button>':''} 
                         <div ${(user==dt.username)?'contenteditable="true"':''} class="content" style="color:white;" id="popcontent${dt.id}" style='color:black;'>
                           ${dt.content}
                         </div>
                       </div>
                     </div>   
                   `
                   divs.appendChild(newRow);
                   addeventpopup(dt.id,'#popup'+dt.id);
                   addlike(dt.id);
                 });
                   
                   save_edited_note();
                   addeventbutton() ;
                   addeventlikebutton();
                  
                
           },
              error: function(error) {
                   console.log('GET error:', error);
               } });}
     
               function customFilter(array, user) {
     return array.filter(item => {
       return item==user
     });
   }
     function del_button_condition(dt){
       if (user==dt.username){
        data= `<a id='download' href='data:text/plain;charset=utf-8,${encodeURIComponent(create_file_content(dt.title,dt.content))}' download='Note_${dt.id}.text'><svg style='margin-left: -4px;margin-right: 10px; margin-top: 6px;' xmlns='http://www.w3.org/2000/svg' height='1.5em' viewBox='0 0 512 512'><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#298de0}</style><path d='M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z'/></svg></a><a id='${dt.id}' class='del-button' > <svg   xmlns='http://www.w3.org/2000/svg' height='1.5em' viewBox='0 0 448 512'><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#2b88d5}</style><path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z'/></svg></a>`
       return data
       }
       else{
         return " "
       }
     }
     function search_table(query){
       console.log(query);
       var divs = document.querySelectorAll('.col-lg-12')[2];
           $.ajax({
               url: 'http://127.0.0.1:8000/note/api/search/'+query,
               type: 'GET',
               headers:{'Authorization': `Token ${token}`},
       success: function(data) {
                 var bg_color_list = ['dark', 'dark-light']; 
                 var color_decs_list =['cyan','yellow','orange'];
                 var images=["1357fb26e241e79.jpg","images.jpg"]
                 data.forEach(function(dt) {
                   var bg_color = bg_color_list[(Math.random() * bg_color_list.length) | 0];
                   var desc_color = color_decs_list[(Math.random() * color_decs_list.length) | 0];
                   var imges_random=images[(Math.random() * images.length) | 0];
                   var newRow = document.createElement("div");
                   newRow.innerHTML=`
                   <div class=" tm-timeline-item">
                           <div class="tm-timeline-item-inner">
                               <img src="img/${imges_random}" alt="Image" class="rounded-circle tm-img-timeline">
                               <div class="tm-timeline-connector">
                                   <p class="mb-0">&nbsp;</p>
                               </div>
                               <div class="tm-timeline-description-wrap">
                                   <div class="tm-bg-${bg_color} tm-timeline-description">
                                       <h3 class="tm-text-${desc_color} tm-font-400">${dt.title.length>64?dt.title.slice(0,64)+'...':dt.title}</h3>
                                       <p>${dt.content.length>85?dt.content.slice(0,85)+'...':dt.content}</p>
                                       <p class="tm-text-yellow float-right mb-0">Created By: ${dt.username}</p>
                                       <p style='margin-right:8px;' class="tm-text-green float-right mb-0">${formatDate(dt.created_at)} </p>
                                       ${del_button_condition(dt)}
                                       </div>
                               </div>
                               <div class="tm-timeline-connector">
                                   <p class="mb-0">&nbsp;</p>
                               </div>
                               <button id="view note${dt.id}" style="border:4px solid #404040  padding: 2px 15px; width: 173px; height: 50px; font-size:20px;">view note<svg style="margin-left:5px;" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg></button>
                           </div>
                           <div class="tm-timeline-connector-vertical"></div>
                       </div> 
                     <!-- The popup overlay and content -->
                     <div id="popup${dt.id}" class="overlay">
                       <div class="popup">
                         <h2 ${(user==dt.username)?'contenteditable="true"':''} id='pophead${dt.id}'>${dt.title}</h2>
                         <a class="close" href="#">&times;</a>
                         <button id="${dt.id}" class="save_note">save</button>
                         <div contenteditable="true" class="content" style="color:white;" id="popcontent${dt.id}" style='color:black;'>
                           ${dt.content}
                         </div>
                       </div>
                     </div> `
                     divs.appendChild(newRow);
                     
     })},
     error: function(error) {
                   console.log('GET error:', error);
               } });}
   
     function get_image(){
       $.ajax({
               url: 'http://127.0.0.1:8000/note/api/profile',
               type: 'GET',
               headers:{'Authorization': `Token ${token}`},
               success: function(data) {
               var image=document.querySelectorAll('#profile')[0];
               image.src=media_url+data[0].profile_picture;
             
           },
              error: function(error) {
                   console.log('GET error:', error);
               } });}
       
   
     if (token){
       var s_btn=document.getElementById("search_note");
       createtable();
       get_image();
       
       let searchTimeout;
       $("#search_note").on('input', function() {
           
           var divs = document.querySelectorAll('.col-lg-12')[2];
           divs.innerHTML='';
           clearTimeout(searchTimeout);
           const searchTerm = $(this).val().trim();
    
           searchTimeout = setTimeout(function() {
                   if (searchTerm !== '') {
                    
                       search_table(searchTerm);
                   }
               }, 300);
       });
      
       s_btn.addEventListener('input', handleInputChange);
       s_btn.addEventListener('change', handleInputChange);
   
           function handleInputChange() {
               if (s_btn.value === '') {
                   createtable();
               }
           }
       
       $("#nav_user_details span#login_text").html(user.toUpperCase());
       
       logout();
     }
   else{
     alert("please login first");
     window.location.href = "login.html";
   }
      
   
   function add_note_post(){
   $('#add_note_btn').click(function(){
     var title=$('#add_title').val();
     var content=$('#add_content').val();
   
     data_note={
       "title": title,
       "content": content}
     $.ajax({
               url: 'http://127.0.0.1:8000/note/api',
               type: 'POST',
               data:data_note,
               headers:{'Authorization': `Token ${token}`},
               success: function(data) {
             console.log(data);
           },
              error: function(error) {
                   console.log('GET error:', error);
               } });  
   });}
   $('#createaddpost').click(function(){
     if(token){
   
     var main_div=document.querySelectorAll('.col-lg-12')[2];
     var newRow = document.createElement("div");
     newRow.innerHTML=`<div class=" tm-timeline-item">
                           <div class="tm-timeline-item-inner">
                            
                               <div class="tm-timeline-description-wrap">
                                   <div class="tm-bg-dark tm-timeline-description">
                                       <h3 class="tm-text-dark tm-font-400"><input type='text' id='add_title' placeholder='enter title'></h3>
                                       <p><input id='add_content' type='text' placeholder='enter title'/></p>
                                       <button id="add_note_btn" style="border:4px solid #404040">save note</button>
                                       </div>    
                               </div>  
                           </div>
                           <div class="tm-timeline-connector-vertical"></div>
                       </div> `;
     main_div.appendChild(newRow)
     
     add_note_post();
     if (newRow){
       var btn_note=document.getElementById("createaddpost");
       btn_note.style.display='none';
     }
   }} 
   )
   
   function create_file_content(title,content){
   data_file=`title:${title}`+'\n'+ `content:${content}`
   return data_file
   }
   function addeventpopup(id,link){
     console.log(id)
    document.getElementById(`view note${id}`).addEventListener("click", function() {
     window.location.href =link;
   })};
   
   function save_edited_note(){
   $('#save_note').click(function(){
     console.log("test");
     var title=$('#pophead').val();
     var content=$('#popcontent').val();
     data_note={
       "title": title,
       "content": content}
     $.ajax({
               url: 'http://127.0.0.1:8000/note/api',
               type: 'POST',
               data:data_note,
               headers:{'Authorization': `Token ${token}`},
               success: function(data) {
             console.log(data);
           },
              error: function(error) {
                   console.log('GET error:', error);
               } });  
   });}
   
   function save_edited_note(){
    var save_buttons = document.querySelectorAll('.save_note');
   save_buttons.forEach(function(button) {
       button.addEventListener('click', function(event) {
           var buttonId = event.target.id;
           var title=$('#pophead'+buttonId).text()
           var content=$('#popcontent'+buttonId).text()
           data={'title':title,'content':content}
           $.ajax({
               url: `http://127.0.0.1:8000/note/api/${buttonId}`,
               type: 'PUT',
               data:data,
               headers:{'Authorization': `Token ${token}`},
               success: function(data) {
                   console.log(data)
               },
               error: function(error) {
                   console.log('GET error:', error);
               }
               });
       });
   });}
   
   function formatDate(inputDate) {
       const months = [
           "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December"
       ];
   
       const dateObj = new Date(inputDate);
       const day = dateObj.getDate();
       const month = months[dateObj.getMonth()];
       const year = dateObj.getFullYear();
   
       const formattedDate = `${day} ${month} ${year}`;
       return formattedDate;
   }
   
   window.onscroll = function() {sessionStorage.setItem("height",window.pageYOffset); };
 
   window.onload = function() {
       var reloading = sessionStorage.getItem("height");
       if (reloading) {
         window.scrollTo(0,sessionStorage.getItem("height",window.pageYOffset))
         sessionStorage.removeItem("height");
           
       }
   }
   
   function addlike(id){
     $('#like_status_'+id).click(function(){
     $.ajax({
               url: `http://127.0.0.1:8000/note/api/likes/${id}`,
               type: 'POST',
               headers:{'Authorization': `Token ${token}`},
               success: function(data) {
                 
                
                  
           },
              error: function(error) {
                   console.log('GET error:', error);
               } });
   })}
  