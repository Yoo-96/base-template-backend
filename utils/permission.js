/*
 * Copyright 2016 Red Hat Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
'use strict';
const _ = require('lodash');
const { populatePropertiesFromArray } = require('./utils');

const protect = spec => {
  const authority = [];

  if (typeof spec === 'string') {
    authority.push(spec);
  } else if (Array.isArray(spec)) {
    authority.concat(spec);
  }

  return async function protect(ctx, next) {
    const { currentUser } = ctx.session;
    if (currentUser) {
      const user = await ctx.service.admin.user.findUserById(currentUser.id);
      if (user.isOpen === 1) {
        const plainUser = user.toJSON();
        const permissions = populatePropertiesFromArray(plainUser.admin_roles, 'code');
        const isAuthorized = _.intersection(authority, permissions).length > 0;
        if (isAuthorized) {
          await next();
          return;
        }
      }
    }

    ctx.status = 403;
    ctx.body = {
      msg: 'Access denied'
    };
  };
};

module.exports = {
  protect,
};
