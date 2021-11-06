import React, { Component } from 'react'

class CreateChannel extends Component {
    constructor(name, id, creator_name, creator_email, creator_id)
    {
        super(name, id, creator_name, creator_email, creator_id);
        this.name = name;
        this.id = id;
        this.creator_name = creator_name;
        this.creator_email = creator_email;
        this.creator_id = creator_id;
    }
    chan() {
        console.log(`${this.creator_name} Email(creator):${this.creator_email}ID: ${this.creator_id} has created a channel with the name: ${this.name}ID:${this.id}`)
    }
}

export default CreateChannel

