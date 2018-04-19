const app = {
  name: 'app.js',
  content: `
    import React from 'react'

    class MyComponentToNPM extends React.Component {
      render () {
        return (
          <div>
            <p>This was bootstraped with <a href='https://github.com/loconluis/create-react-components' target='_blank'><strong>create-react-component</strong></a></p>
          </div>
        )
      }
    }

    export default MyComponentToNPM`
}
module.exports = app
