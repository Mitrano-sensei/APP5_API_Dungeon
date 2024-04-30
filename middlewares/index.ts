import Joi from 'joi';

export module Schemas {

    export const playerSchema: any = Joi.object({
        id: Joi.number().integer().min(0).required(),
        name: Joi.string().required()
    });
    
    export const dungeonSchema: any = Joi.object({
        id: Joi.number().integer().min(0).required(),
        name: Joi.string().required()
    });
    
    export const scoreSchema: any = Joi.object({
        id: Joi.number().integer().min(0).required(),
        dungeonId: Joi.number().integer().min(0).required(),
        points: Joi.number().integer().min(0).required(),
        group: Joi.array().items(playerSchema).required()
    });
    
    export const playersGetSchema: any = Joi.object({
        page: Joi.number().integer().min(1),
        size: Joi.number().integer().min(1)
    });
    
    export const playersGetByIdSchema: any = Joi.object({
        id: Joi.number().integer().min(0).required()
    });
    
    export const playersGetByNameSchema: any = Joi.object({
        name: Joi.string().alphanum().required()
    });
    
    export const playersPostSchema: any = Joi.object({
        name: Joi.string().alphanum().required()
    });
    
    export const playersPutSchema: any = Joi.object({
        name: Joi.string().alphanum().required(),
        id: Joi.number().integer().min(0).required()
    });
    
    export const playersDeleteSchema: any = Joi.object({
        id: Joi.number().integer().min(0).required()
    });
    
    export const scoresGetByIdSchema: any = Joi.object({
        id: Joi.number().integer().min(0).required()
    });
    
    export const scoresGetSchema: any = Joi.object({
        min: Joi.number().integer(),
        max: Joi.number().integer(),
        orderby: Joi.string().pattern(new RegExp('^(points|id)$')),
        desc: Joi.number().integer(),
        page: Joi.number().integer().min(1),
        size: Joi.number().integer().min(1)
    });
    
    export const scoresGetByDungeonSchema: any = Joi.object({
        id: Joi.number().integer().min(0).required(),
        min: Joi.number().integer(),
        max: Joi.number().integer(),
        orderby: Joi.string().pattern(new RegExp('^(points|id)$')),
        desc: Joi.number().integer(),
        page: Joi.number().integer().min(1),
        size: Joi.number().integer().min(1)
    });
    
    export const scoresGetByPlayerSchema: any = Joi.object({
        id: Joi.number().integer().min(0).required(),
        min: Joi.number().integer(),
        max: Joi.number().integer(),
        orderby: Joi.string().pattern(new RegExp('^(points|id)$')),
        desc: Joi.number().integer(),
        page: Joi.number().integer().min(1),
        size: Joi.number().integer().min(1)
    });
    
    export const scoresPostSchema: any = Joi.object({
        dungeonId: Joi.number().integer().min(0).required(),
        points: Joi.number().integer().min(0).required(),
        playerIds: Joi.array().items(Joi.number().integer().min(0)).required()
    })
    
    export const scoresPutSchema: any = Joi.object({
        dungeonId: Joi.number().integer().min(0).required(),
        points: Joi.number().integer().min(0),
        playerIds: Joi.array().items(Joi.number().integer().min(0))
    });
    
    export const scoresDeleteSchema: any = Joi.object({
        id: Joi.number().integer().min(0).required()
    });
    
    export const dungeonsGetSchema: any = Joi.object({
        page: Joi.number().integer().min(1),
        size: Joi.number().integer().min(1)
    });
    
    export const dungeonsGetByIdSchema: any = Joi.object({
        id: Joi.number().integer().min(0).required()
    });
    
    export const dungeonsGetByNameSchema: any = Joi.object({
        name: Joi.string().alphanum().required()
    });
    
    export const dungeonsPostSchema: any = Joi.object({
        name: Joi.string().alphanum().required()
    });
    
    export const dungeonsPutSchema: any = Joi.object({
        name: Joi.string().alphanum().required(),
        id: Joi.number().integer().min(0).required()
    });
    
    export const dungeonsDeleteSchema: any = Joi.object({
        id: Joi.number().integer().min(0).required()
    });

}


