import Term from './Term';
import Translation from './Translation';

/**
 * An entity that represents a property, qualification, or privilege that users may own.
 *
 * 1. Granted
 * Administrators or id.snucse.org system may grant for users with nodes.
 *   - Expiry time may be provided when granting nodes.
 *   - Records in users_nodes table represents one of the granted nodes (if accepted is true),
 *     or requests by users for the node that has not been granted. (if accepted is false)
 * When a node is being granted, any granted nodes that conflicts with the node must be revoked.
 * When requesting for a node to be granted, users must have been submitted all 'requiredField'
 * of the node
 *
 * 2. Approved
 * A node may be approved to a user because of one of the following reasons:
 *   - Administrators have granted for the user with this node.
 *   - The user has enrolled in a class that implies this node.
 *
 * 3. Associated
 * An 'associated set of a user' is the minimal set with the following rules to compute
 *   - Any approved nodes of a user are also associated to the user
 *   - Nodes that any associated nodes 'imply' are also associated to the user
 *   - A node that all of its 'impliedBy' nodes are associated is also associated to the user
 *
 * 4. Acknowledged
 * An 'acknowledged set of a user' is the minimal set with the following rules to compute
 *   - An approved node is acknowledged to the user if acceptance statuses of
 *     all 'requiredTerms' of the node are 'ok'
 *   - A node that any of acknowledged node implies is acknowledged to the user
 *     if acceptance statuses of all 'requiredTerms' of the node are 'ok'
 *   - A node that all of its 'impliedBy' nodes are acknowledged is acknowledged,
 *     if acceptance statuses of all 'requiredTerms' of the node are 'ok'
 *
 * Acknowledged set of a user is always subset of 'semi-associated set of the user'
 *
 * 5. Semi-acknowledged
 * A 'semi-acknowledged set of a user' is the minimal set with the following rules to compute
 *   - An approved node is semi-acknowledged to the user if acceptance statuses of
 *     all 'requiredTerms' of the node are not 'no'
 *   - A node that any of semi-acknowledged node implies is semi-acknowledged to the user
 *     if acceptance statuses of all 'requiredTerms' of the node are not 'no'
 *   - A node that all of its 'impliedBy' nodes are semi-acknowledged is semi-acknowledged,
 *     if acceptance statuses of all 'requiredTerms' of the node are not 'no'
 *
 * Semi-acknowledged set of a user is always subset of 'associated set of the user'
 *
 * 6. Masked
 * Administrators can mask specific nodes for a user.
 * This prevents privileges that nodes represent from being valid.
 *
 * 7. Valid
 * A 'valid set of a user' is 'associated set of the user' - 'masked set of the user'
 * Valid sets of users are stored in 'users_valids' table.
 *   - The node is in 'acknowledged set' if and only if 'termOk' field is true.
 *   - The node is in 'semi-acknowledged set' if and only if 'termSemi' field is true.
 */
interface Node {
  // Magic number of this node. Should not be changed once issued.
  // This value is stored in database to represent this node.
  nodeId: number;
  // Name of this node. Should not be changed once issued.
  // This value is used as identifier for this node. (for URI or third party apps)
  name: string;
  // Description of this node for human.
  description: Translation;
  // Association of this node with a user implies associations of all implied nodes with the user.
  implies: Array<Node>;
  // When all the 'impliedBy' nodes are associated with a user,
  // this node is also associated with the user.
  impliedBy: Array<Node>;
  // For any permissions related to this node to be valid,
  // user must accept all the specified terms.
  requiredTerms: Array<Term>;
  // List of required information for this node to be granted
  // Also, being granted with this node will disable users from modify or delete listed Fields
  requiredFields: Array<Field>;
  // List of domains of verified email addresses that is required for this node to be granted
  requiredVerifiedEmail: Array<string>;
  // On granted message (for email notification)
  onGranted?: Translation;
  // On revoked message
  onRevoked?: Translation;
  // Added to valid set
  validAdded?: Translation;
  // Removed from valid set
  validRemoved?: Translation;
}

/**
 * A designator for one field
 */
interface Field {
  // relevant column name in users table
  users: string;
  // on classes table
  classes: string;
  // on users_classes table
  users_classes: string;
}

export default Node;
