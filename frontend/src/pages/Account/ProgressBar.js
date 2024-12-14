import React from 'react'

const ProgressBar = ({bgcolor,progress,height}) => {
   
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: 'gray',
        borderRadius: 40,
        marginTop: 30,
        marginBottom: 30

      }
    
      const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:40,
        textAlign: 'right'
      }
    
      const progresstext = {
        padding: 20,
        color: 'white',
        fontWeight: 900
      }
      
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
    )
}

export default ProgressBar;