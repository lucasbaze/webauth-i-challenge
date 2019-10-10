exports.up = function(knex) {
    return knex.schema.createTable('users', t => {
        t.increments('user_id');
        t.string('username')
            .notNullable()
            .comment('The username the user signs up with');
        t.string('password')
            .notNullable()
            .comment('The user created password');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
