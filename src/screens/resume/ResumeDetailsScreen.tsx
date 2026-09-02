import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { useSavedResumes } from '../../context/SavedResumesContext';

export default function ResumeDetailsScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const { savedResumes } = useSavedResumes();

    const { resumeId } = route.params as {
        resumeId: string;
    };

    const savedResume = savedResumes.find(
        (item) => item.id === resumeId,
    );

    const resume = savedResume?.data;

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                {/* CABEÇALHO */}

                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>
                            ← Voltar
                        </Text>
                    </Pressable>

                    <Text style={styles.step}>
                        CURRÍCULO
                    </Text>

                    <Text style={styles.title}>
                        Visualizar currículo
                    </Text>

                    <Text style={styles.subtitle}>
                        Visualize as informações do seu currículo.
                    </Text>
                </View>

                {/* DADOS PESSOAIS */}

                <View style={styles.card}>
                    <Text style={styles.sectionNumber}>
                        01
                    </Text>

                    <Text style={styles.sectionTitle}>
                        Dados pessoais
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.name}>
                        {resume?.personal.name || 'Nome não informado'}
                    </Text>

                    <Text style={styles.info}>
                        {resume?.personal.email || 'E-mail não informado'}
                    </Text>

                    <Text style={styles.info}>
                        {resume?.personal.phone || 'Telefone não informado'}
                    </Text>

                    <Text style={styles.info}>
                        {resume?.personal.city || 'Cidade não informada'}
                    </Text>
                </View>

                {/* EXPERIÊNCIA */}

                <View style={styles.card}>
                    <Text style={styles.sectionNumber}>
                        02
                    </Text>

                    <Text style={styles.sectionTitle}>
                        Experiência profissional
                    </Text>

                    <View style={styles.divider} />

                    {resume?.experiences.length ? (
                        resume.experiences.map((experience) => (
                            <View
                                key={experience.id}
                                style={styles.item}
                            >
                                <Text style={styles.name}>
                                    {experience.position}
                                </Text>

                                <Text style={styles.info}>
                                    {experience.company}
                                </Text>

                                <Text style={styles.info}>
                                    {experience.startDate} — {experience.endDate}
                                </Text>

                                {!!experience.description && (
                                    <Text style={styles.description}>
                                        {experience.description}
                                    </Text>
                                )}
                            </View>
                        ))
                    ) : (
                        <Text style={styles.info}>
                            Nenhuma experiência informada.
                        </Text>
                    )}
                </View>

                {/* FORMAÇÃO */}

                <View style={styles.card}>
                    <Text style={styles.sectionNumber}>
                        03
                    </Text>

                    <Text style={styles.sectionTitle}>
                        Formação acadêmica
                    </Text>

                    <View style={styles.divider} />

                    {resume?.education.length ? (
                        resume.education.map((education) => (
                            <View
                                key={education.id}
                                style={styles.item}
                            >
                                <Text style={styles.name}>
                                    {education.course}
                                </Text>

                                <Text style={styles.info}>
                                    {education.institution}
                                </Text>

                                <Text style={styles.info}>
                                    {education.startDate} — {education.endDate}
                                </Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.info}>
                            Nenhuma formação informada.
                        </Text>
                    )}
                </View>

                {/* HABILIDADES */}

                <View style={styles.card}>
                    <Text style={styles.sectionNumber}>
                        04
                    </Text>

                    <Text style={styles.sectionTitle}>
                        Habilidades
                    </Text>

                    <View style={styles.divider} />

                    {resume?.skills.length ? (
                        <View style={styles.skillsList}>
                            {resume.skills.map((skill) => (
                                <View
                                    key={skill}
                                    style={styles.skillTag}
                                >
                                    <Text style={styles.skillText}>
                                        {skill}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.info}>
                            Nenhuma habilidade informada.
                        </Text>
                    )}
                </View>

                {/* OBJETIVO */}

                <View style={styles.card}>
                    <Text style={styles.sectionNumber}>
                        05
                    </Text>

                    <Text style={styles.sectionTitle}>
                        Objetivo profissional
                    </Text>

                    <View style={styles.divider} />

                    <Text style={styles.name}>
                        {resume?.objective.desiredPosition ||
                            'Cargo não informado'}
                    </Text>

                    <Text style={styles.info}>
                        {resume?.objective.area ||
                            'Área não informada'}
                    </Text>

                    <Text style={styles.info}>
                        {resume?.objective.level ||
                            'Nível não informado'}
                    </Text>

                    {!!resume?.objective.description && (
                        <Text style={styles.description}>
                            {resume.objective.description}
                        </Text>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B0F14',
    },

    content: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },

    header: {
        marginBottom: 24,
    },

    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 24,
    },

    backButtonText: {
        color: '#F5B942',
        fontSize: 14,
        fontWeight: '600',
    },

    step: {
        color: '#F5B942',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 8,
    },

    title: {
        color: '#F5F7FA',
        fontSize: 28,
        fontWeight: '700',
    },

    subtitle: {
        color: '#7E8A97',
        fontSize: 14,
        marginTop: 6,
    },

    card: {
        backgroundColor: '#111820',
        borderWidth: 1,
        borderColor: '#28313C',
        borderRadius: 18,
        padding: 18,
        marginBottom: 16,
    },

    sectionNumber: {
        color: '#F5B942',
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 4,
    },

    sectionTitle: {
        color: '#F5F7FA',
        fontSize: 17,
        fontWeight: '700',
    },

    divider: {
        height: 1,
        backgroundColor: '#28313C',
        marginVertical: 16,
    },

    name: {
        color: '#F5F7FA',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 6,
    },

    info: {
        color: '#8D99A6',
        fontSize: 13,
        lineHeight: 20,
    },

    item: {
        marginBottom: 16,
    },

    description: {
        color: '#AAB4BF',
        fontSize: 13,
        lineHeight: 20,
        marginTop: 8,
    },

    skillsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    skillTag: {
        backgroundColor: '#1D2732',
        borderWidth: 1,
        borderColor: '#34404D',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    skillText: {
        color: '#F5B942',
        fontSize: 12,
        fontWeight: '600',
    },
});