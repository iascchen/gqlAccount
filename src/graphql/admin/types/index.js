import basic from '../../common/types/basic'
import User from './User'
import Organization from './Organization'
import Branch from './Branch'
import Invite from './Invite'
import OrgAdminTransfer from './OrgAdminTransfer'
import ACLs from './ACL'
import ACLGroup from './ACLGroup'
import UserACL from './UserACL'
import AdminACL from './AdminACL'

const typeDefs = [basic, User, Organization, Branch, Invite, OrgAdminTransfer, ACLs, ACLGroup, UserACL, AdminACL]
export default typeDefs
