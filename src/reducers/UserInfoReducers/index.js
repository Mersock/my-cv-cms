import { USERINFO_SAVE, USERINFO_DESTROY } from '../../actions/type';

export default (state = {}, action) => {
  switch (action.type) {
    case USERINFO_SAVE:
      const { id, username, permissions } = action.payload;
      return { ...state, id, username, permissions };
    case USERINFO_DESTROY:
      return {};
    default:
      return state;
  }
};
