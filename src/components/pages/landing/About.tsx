import * as React from 'react'
import { AboutProps } from '../../types/interfaces/shared'
import styled from 'styled-components'

const StyledCard = styled.div`
    border: 1px solid white;
    margin: 0 10px;
    text-align: center;
    padding: 2rem;
`

const About: React.FC<AboutProps> = ({ about, experience }) => {
    return (
        <section className="container-fluid py4 py2-md about">
            <div className="container">
                <div className="flex flex-row flex-align-center flex-justify-center space-between">
                    <StyledCard className="col-md-4">
                        <h1>Service 1</h1>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, adipisci
                            nesciunt? Voluptates, nisi consequuntur minus
                        </p>
                    </StyledCard>
                    <StyledCard className="col-md-4">
                        <h1>Service 2</h1>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, adipisci
                            nesciunt? Voluptates, nisi consequuntur minus
                        </p>
                    </StyledCard>
                    <StyledCard className="col-md-4">
                        <h1>Service 3</h1>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, adipisci
                            nesciunt? Voluptates, nisi consequuntur minus
                        </p>
                    </StyledCard>
                </div>
            </div>
        </section>
    )
}

export default About
