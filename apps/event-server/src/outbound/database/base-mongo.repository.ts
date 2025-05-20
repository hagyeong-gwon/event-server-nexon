import { Model, Document } from 'mongoose';

interface Mapper<TDomain, TDoc> {
  toDomain(doc: TDoc): TDomain;
  toPersistence(domain: TDomain): Partial<TDoc>;
}

export abstract class MongoBaseRepository<TDomain, TDoc extends Document> {
  constructor(
    protected readonly model: Model<TDoc>,
    protected readonly mapper: Mapper<TDomain, TDoc>,
  ) {}

  async saveOne(entity: TDomain): Promise<TDomain> {
    const raw = this.mapper.toPersistence(entity);
    const doc = new this.model(raw);
    const saved = await doc.save();
    return this.mapper.toDomain(saved);
  }

  async findOneById(id: string): Promise<TDomain | null> {
    const doc = await this.model.findById(id).exec();
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async findAllByIds(ids: string[]): Promise<TDomain[]> {
    const docs = await this.model.find({ _id: { $in: ids } }).exec();
    return docs.map((doc) => this.mapper.toDomain(doc));
  }
}
