import React from "react"
import styles from "./Card.module.css"
import { MemberProps } from "@/interfaces/member.interface"

interface CardProps {
  members: MemberProps[]
}

const Card: React.FC<CardProps> = ({ members }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <ul>
          {members.map((member: MemberProps) => (
              <li key={member.id}>
                {member.first_name} {`(${member.id})`}
              </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Card
