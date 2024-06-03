import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeNotification } from 'Actions';
import NotificationSystem from 'react-notification-system';
 
class NotificationContainer extends Component {
 
  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }
 
  componentWillReceiveProps(newProps) {
    let { message, level, autoDismiss, uid, dismissable } = newProps.notification;
    if(!newProps.notification.level) {
      return;
    }

    const self = this;
    this.notificationSystem.addNotification({
      message,
      level,
      autoDismiss : autoDismiss ? autoDismiss : 1,
      uid,
      dismissable: dismissable ? dismissable : true,
      onRemove: function() {
        self.props.removeNotification();
      }
    });
  }
 
  render() {
    return (
      <NotificationSystem ref="notificationSystem" />
    );
  }
}
 
function mapStateToProps(state) {
  return {
    notification: state.currentProject.notification
  };
}
 
function mapDispatchToProps(dispatch) {
  return {
    removeNotification: () => {
      dispatch(removeNotification())
    },

  };
}
 
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationContainer);