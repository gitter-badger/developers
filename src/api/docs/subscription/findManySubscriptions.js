import PaginatedMethod from "../../paginatedMethod.js";
import Parameter from "../../parameter.js";
import Example from "../../example.js";

import AccessDeniedExample from "../../accessDeniedExample.js";

export default class SomeAPIMethod extends PaginatedMethod {
  uri() { return "/api/v1/users/:id/subscriptions"; }
  version() { return 1; }
  httpMethod() { return "GET"; }
  description() {
    return (
      <p>
        This retrieves a list of channels the user is subscribed to. This is
        <em>not</em> the channels a user follows.
      </p>
    );
  }

  parameters() {
    return super.parameters().concat([
      new IDParameter(),
      new FieldsParameter(),
      new SortParameter()
    ]);
  }
  examples() { return [ new SuccesfulExample(), new AccessDeniedExample() ]; }
}

class IDParameter extends Parameter {
  name() { return "id"; }
  description() { return "Numeric user ID for which to gather subscriptions."; }
}

class FieldsParameter extends Parameter {
  name() { return "fields"; }
  description() { return "Comma-delimited list of fields on models you want " +
                         "to return. If not passed, all available fields are " +
                         "returned."; }
  optional() { return true; }
  default() { return undefined; }
}

class SortParameter extends Parameter {
  name() { return "id"; }
  description() {
    return (
      <p>
        Specifies the order in which results should be displayed in the
        format of one or more blocks in the form <code>attribute:direction</code>,
        separated by commas. For example, <code>attr1:desc,attr2:asc</code>.
      </p>
    );
  }
  optional() { return true; }
  default() { return undefined; }
}

class SuccesfulExample extends Example {
  httpCode() { return 200; }
  data() {
    return {[{
      Group: {
        id: 9,
        name: "Subscriber"
      },
      cancelled: null,
      createdAt: Date.now().toISOString(),
      expiresAt: Date.now().toISOString(),
      group: 9,
      id: 950,
      resourceId: 3181,
      resourceType: "channel",
      status: "active",
      updatedAt: Date.now().toISOString()
    }]}
  }
}
