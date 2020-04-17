import mongoose from 'mongoose';
import schemas from './schemas';

export const paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize);
}

export const createProfileStore = (host) => {
  const connection = mongoose.createConnection(host, { useNewUrlParser: true,  useUnifiedTopology: true });
  const Profile = connection.model('User', schemas.profileSchema);

  connection.on('error', console.error.bind(console, '🎾 connection error:'));
  connection.once('open', function() { console.log('🎾 online')});

  return { Profile };
}

const createStore = (host) => {
  const connection = mongoose.createConnection(host, { useNewUrlParser: true,  useUnifiedTopology: true });
  const User = connection.model('User', schemas.userSchema);
  const Message = connection.model('Chat', schemas.chatSchema);
  const Chat = connection.model('Chatroom', schemas.chatroomSchema);

  connection.on('error', console.error.bind(console, '📗 connection error:'));
  connection.once('open', function() { console.log('📗 online')});

  return { User, Message, Chat };
}

export default createStore;