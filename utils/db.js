/**
 *@BelongsProject: base-template-backend
 *@Author: yoo
 *@CreateTime:
 *@Description: 数据模型默认配置
 */
'use strict';
const uuidv1 = require('uuid/v1');

function generateUUID () {
  return uuidv1();
}

function defineModel (app, name, attributes, options = {}) {
  const { UUID } = app.Sequelize;
  const attrs = {};

  attrs.id = {
    type: UUID,
    primaryKey: true,
    defaultValue: () => {
      return generateUUID();
    },
  };

  for (const key in attributes) {
    const value = attributes[key];
    if (typeof value === 'object' && value.type) {
      value.allowNull = value.allowNull && true;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: true,
      };
    }
  }

  return app.model.define(name, attrs, {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    timestamps: true,
    freezeTableName: true,
    ...options,
  });
}

module.exports = { defineModel };
