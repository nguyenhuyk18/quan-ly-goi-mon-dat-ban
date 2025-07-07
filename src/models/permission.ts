class permission {
    private role_id : number = null;
    private action_id : number = null;

    constructor(role_id : number = null, action_id : number = null) {
        this.role_id = role_id;
        this.action_id = action_id;
    }

    getterRoleId() : number {
        return this.role_id;
    }

    getterActionId() : number {
        return this.action_id;
    }

    setterRoleId(role_id : number) : void {
        this.role_id = role_id;
    }

    setterActionId(action_id : number) : void {
        this.action_id = action_id;
    }
}

export default permission;