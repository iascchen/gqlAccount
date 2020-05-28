import userModel from './models/User'
import organizationModel from './models/Organization'
import branchModel from './models/Branch'
import inviteModel from './models/Invite'
import orgAdminTransferModel from './models/OrgAdminTransfer'

import aclModel from './models/ACL'
import aclGroupModel from './models/ACLGroup'

import userACLModel from './models/UserACL'
import adminACLModel from './models/AdminACL'

export const models = {
    userModel,
    organizationModel,
    branchModel,

    inviteModel,
    orgAdminTransferModel,

    aclModel,
    aclGroupModel,
    userACLModel,
    adminACLModel,
}
