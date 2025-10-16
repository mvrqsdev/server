import { Lead } from "@/domain/lead/entities/lead.entity";

export abstract class ISpecification<T> {
	abstract isSatisfiedBy(target: T): Promise<boolean>
}


export class AgentHasFeverSpecification extends ISpecification<Lead> {
  isSatisfiedBy(agent: Lead): Promise<boolean> {
    return agent.
  }
}