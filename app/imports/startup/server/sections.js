/**
 * Created by X on 2016/11/1.
 */
import {Sections} from '../../api/sections/sections.js';
import {UserData} from '../../api/userdata/userdata.js';
import {Messages} from '../../api/chatroom/messages.js';
import {_} from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';

/**
 * A list of Stuff to pre-fill the Collection.
 * @type {*[]}
 */
let d = new Date();

const sectionSeeds = [
  // { course: 'ICS314', startTime: d, endTime: new Date(d.getTime() + 75*60000), currentCapacity: 0, maxCapacity: '45', purpose: 'Project', description: 'No description Yet' },
];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Sections.find().count() === 0) {
  _.each(sectionSeeds, function seedSections(stuff) {
    Sections.insert(stuff);
  });
}

Meteor.setInterval(function() {
  // console.log(this.userId);

  let expiredSec = Sections.find({endTime: { $lte: new Date() }}).fetch();
  for (let section of expiredSec) {
    const owner = section.createdBy.user;
    // console.log(section.currentCapacity);
    for (let userObject of section.usersIn){
      // console.log(user);
      let userElement = UserData.findOne({userName: userObject.user});
      if (userElement.userName == owner){
        UserData.update(userElement._id, { $inc: { sessionsCreated: 1 } });
        let numberOfCreated = userElement.sessionsCreated;
        let beltRanks = userElement.belt_ranks;
        let i = 0;
        let index = beltRanks.length - 1;
        for (i = 0; i < beltRanks.length;i++){
          if (numberOfCreated < beltRanks[i]){
            index = i - 1;
            break;
          }
        }
        let beltType = userElement.belt_types;
        UserData.update(userElement._id, { $set: { create_belt: beltType[index] } });
      }
      else{
        UserData.update(userElement._id, { $inc: { sessionsAttended: 1 } });
        let numberOfAttended = userElement.sessionsAttended;
        let beltRanks = userElement.belt_ranks;
        let i = 0;
        let index = beltRanks.length - 1;
        for (i = 0; i < beltRanks.length;i++){
          if (numberOfAttended < beltRanks[i]){
            index = i - 1;
            break;
          }
        }
        let beltType = userElement.belt_types;
        UserData.update(userElement._id, { $set: { attend_belt: beltType[index] } });

      }
      UserData.update(userElement._id, { $set: { currentInSection: '' } });
      // console.log(userId);
    }
    Sections.remove(section._id);
    const expiredMessages = Messages.find({section:section._id}).fetch();
    for (let message of expiredMessages){
      Messages.remove(message._id);
    }

  }

}, 5000);

