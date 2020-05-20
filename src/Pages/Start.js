import React from 'react';
import auth from '../Components/auth';
import { IoMdRefresh } from "react-icons/io";
import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import TextLoader from '../Components/TextLoader';
import cogoToast from 'cogo-toast';


export function Start (props) {

	const[ data , setData ] = useState(false)

	const[ text ,setText ] = useState([])

	const[ loading, setLoading ] = useState(true)

  const[ wpm  , setWpm ] = useState(0)



	function startTimer(e) {
     let count = 1;
     document.getElementById("paraEnter").focus();
	   document.getElementById('paraEnter').disabled = false;
	   document.getElementById('startbt').style.background = 'green';
	   var start = document.getElementById("startbt");
	   start.className += "disabled";

     var timer = 
     setInterval(function(){
      document.getElementById('timer').innerHTML ='⏱️: ' + count + ' s';
      count++;
      },1000)

      setTimeout(function(){
          clearInterval(timer)
	        document.getElementById('startbt').style.background = 'orangered';
	        document.getElementById('paraEnter').disabled = true; 
	        var text = document.getElementById('wpm').innerHTML
	        var wpm = text.split(":")[1]
	        var username = localStorage.getItem("typerex_username")
          cogoToast.success(
                <div>
                  <div><b>Your wpm is &nbsp; { wpm }</b></div>
                </div>,{ hideAfter:4},
          );
	        auth.userUpdate(username,wpm)
		      .then(() => {
            setTimeout(function(){window.location.reload(false)},500)
		      	
	            localStorage.setItem('wpm',wpm)

		        
		      })
		      .catch(e => {
		        console.log(e)
		    })

	    },60000)
	}

	const history = useHistory();




  // Typing text wpm calculator and color change method

	function handleChange(e) {

	    let value = document.getElementById("paraEnter").value;
      let last = text.length;
      var wpm = 0;

      for (var j = 0; j < last; j++) {
        function colorText(bgcolor, tcolor, index) {
          document.getElementById(index).style.background = bgcolor;
          document.getElementById(index).style.color = tcolor;
        }

        if (value[j] === text[j]) {
          
          if(value[j] === " "){
            wpm++;
          }
          colorText("springgreen", "black", j);
         

        } else {
          colorText("#017188", "white", j);
          break;

        }
      }
      setWpm(wpm)
	}

  function reloadText() {
    setTimeout(function(){window.location.reload(false)},500)
  
  }
	

	function fetchText() {

    setLoading(true);

    auth.Text()
      .then((data) => {
        setLoading(false);
        setData(true);
        setText(data.data.Text);
        
      })
      .catch(e => {
        setData(false);
      })

	}

  //useEffect hooks for handling render

	useEffect((props) => {  	      
  	document.title='Start';
    document.getElementById('timer').innerHTML ='⏱️: 0 s';
  	const username = localStorage.getItem('typerex_username');
    document.getElementById('username').innerHTML = '👤' + username;
    document.getElementById('user-wpm').innerHTML = 'Current wpm: ' + localStorage.getItem('wpm') + ' 💨';
      auth.userInfo(username)
      .then((data) => {
          
        
      })
      .catch(e => {
      	history.push('/')
      })
      fetchText()},[]);

        if(data){
            var rows = [];
            for (var i = 0; i < text.length; i++) {
                rows.push(<span id={i} key={i}>{text[i]}</span>);
            }
        }

	    return(   
	    	<div className='test-container'> 
                    <div className='test-card'>
                        <div className='para-card'>
                            { loading ? <div style={{display:'flex',justifyContent:'center'}}> <TextLoader/> </div> : rows }
                            <div className='reloadbt' onClick={reloadText}>
                            	<span className='reload'> 
                            	< IoMdRefresh /> 
                            	</span>
                            </div>
                        </div>
                           <div className='activity'>
                              <a id='startbt' onClick={startTimer}>🏁 Start </a>
                              <p id='timer'> ⏱️: </p>
                              <p id='wpm'> ✍️ : {wpm} </p>
                           </div>
                           <div className='test-enter' style={{display:'flex'}}>
                         <input disabled id='paraEnter' type='text' placeholder='Start typing......' onChange={handleChange}></input>
                          </div>
                        </div>
                      <div className='test-below'>
                    </div>
                </div>
			);
}


