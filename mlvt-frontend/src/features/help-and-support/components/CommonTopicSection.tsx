import { Container, Grid, Typography } from '@mui/material'
import TopicCard, { TopicCardProps } from './TopicCard'

interface CommonTopicsSectionProps {
    topics: TopicCardProps[];
    onTopicClick: (topic: TopicCardProps) => void;
}

const CommonTopicsSection: React.FC<CommonTopicsSectionProps> = ({
    topics, onTopicClick
}) => {
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, mb: 10 }}>
            <Typography
                variant="h4"
                component="h2"
                fontWeight="700"
                gutterBottom
                sx={{
                    mb: 4,
                    fontFamily: 'Poppins, sans-serif',
                    color: '#E0E0E0',
                }}
            >
                Common Topics
            </Typography>
            <Grid container spacing={3}>
                {topics.map((topic, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <TopicCard
                            title={topic.title}
                            description={topic.description}
                            linkText={topic.linkText}
                            href={topic.href}
                            onClick={() => onTopicClick(topic)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default CommonTopicsSection
