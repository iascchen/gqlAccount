import User from './models/User'
import Organization from './models/Organization'
import Branch from './models/Branch'
import Invite from './models/Invite'
import OrgAdminTransfer from './models/OrgAdminTransfer'

import ACL from './models/ACL'
import ACLGroup from './models/ACLGroup'

import UserACL from './models/UserACL'
import AdminACL from './models/AdminACL'

export const models = {
    User,
    Organization,
    Branch,

    Invite,
    OrgAdminTransfer,

    ACL,
    ACLGroup,
    UserACL,
    AdminACL,
}
