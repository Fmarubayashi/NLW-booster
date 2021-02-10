import {Request, Response} from 'express';
import knex from '../database/connection';
class PointsController {

    async index(request: Request, response: Response) {
        // cidade, uf, items do (Query params). Para filtros a gente sempre usa do query params
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

            return response.json(points);

    }

    async show( request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Point not found.'});
        }

        const items = await knex ('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');


        return response.json({point, items});
    }

    async create(request: Request, response: Response) {
            const {
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf,
                items
            } = request.body;
        
            const trx = await knex.transaction(); //faz a relação entre essas 2 funçÕes com o trx('...'). Se uma delas não der certo a outra também não vai ser executada
        
            const point = {
                image: 'image-https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60',
                name,
                email,
                whatsapp,
                latitude,
                longitude,
                city,
                uf
            }

            const insertedIds = await trx('points').insert(point);
        
            const point_id = insertedIds[0];
            
            const pointItems = items.map((item_id: number) => {
                return {
                    item_id, 
                    point_id: insertedIds[0],
                }
            }) 
        
            await trx('point_items').insert(pointItems);
        
            await trx.commit(); //depois de usar a transaction (trx) precisamos dar um commit no final

            return response.json({
                id: point_id,
                ...point,
            });
        }
    }
export default PointsController;