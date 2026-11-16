import type { Access, FieldAccess } from 'payload'

export const anyone: Access = () => true

export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'

export const isAdminField: FieldAccess = ({ req: { user } }) => user?.role === 'admin'

/** Admins can act on every user; everyone else only on their own account. */
export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return { id: { equals: user.id } }
}
