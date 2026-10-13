import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

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

    async function handleGeneratePdf() {
        if (!savedResume) {
            Alert.alert(
                'Erro',
                'Currículo não encontrado.',
            );
            return;
        }

        const { data } = savedResume;

        const html = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8" />

                <style>
                    @page {
                        margin: 20mm 15mm 25mm 15mm;
                    }

                    body {
                        font-family: Arial, sans-serif;
                        color: #222;
                        padding: 40px;
                    }

                    .header {
                        border-bottom: 2px solid #222;
                        padding-bottom: 18px;
                        margin-bottom: 25px;
                    }

                    h1 {
                        font-size: 30px;
                        margin: 0 0 10px 0;
                        color: #111;
                    }

                    .contact {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                        color: #555;
                        font-size: 12px;
                    }

                    .experience-item {
                        margin-bottom: 22px;
                        padding-left: 14px;
                        border-left: 3px solid #222;
                    }

                    .experience-item,
                    .education-item {
                        break-inside: avoid;
                        page-break-inside: avoid;
                    }

                    .education-item {
                        margin-bottom: 18px;
                        padding-left: 14px;
                        border-left: 3px solid #222;
                    }

                    .education-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        gap: 20px;
                    }

                    .institution {
                        margin-top: 4px;
                        font-size: 13px;
                        color: #555;
                    }

                    .experience-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                        gap: 20px;
                    }

                    .skills {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 8px;
                        margin-top: 10px;
                    }

                    .skill {
                        display: inline-block;
                        padding: 6px 10px;
                        border: 1px solid #bbb;
                        border-radius: 6px;
                        background-color: #f5f5f5;
                        color: #222;
                        font-size: 12px;
                    }

                    .objective-position {
                        font-size: 16px;
                        font-weight: bold;
                        color: #222;
                        margin-bottom: 8px;
                    }

                    .objective-details {
                        font-size: 12px;
                        color: #666;
                        margin-bottom: 12px;
                    }

                    .objective-description {
                        font-size: 13px;
                        line-height: 1.6;
                        color: #333;
                    }

                    .item-title {
                        font-weight: bold;
                        font-size: 15px;
                        color: #111;
                    }

                    .company {
                        margin-top: 4px;
                        font-size: 13px;
                        color: #555;
                    }

                    .date {
                        font-size: 11px;
                        color: #666;
                        white-space: nowrap;
                    }

                    .experience-description {
                        margin-top: 8px;
                        margin-bottom: 0;
                        font-size: 13px;
                        line-height: 1.5;
                        color: #333;
                    }

                    .contact span:not(:last-child)::after {
                        content: " • ";
                        margin-left: 8px;
                    }

                    h2 {
                        font-size: 18px;
                        margin-top: 25px;
                        border-bottom: 1px solid #ddd;
                        padding-bottom: 5px;
                        break-after: avoid;
                        page-break-after: avoid;
                    }

                    p {
                        font-size: 13px;
                        line-height: 1.5;
                    }

                    .contact {
                        color: #555;
                        margin-bottom: 20px;
                    }

                    .item {
                        margin-bottom: 15px;
                    }

                    .item-title {
                        font-weight: bold;
                        font-size: 14px;
                    }

                    .muted {
                        color: #666;
                    }

                    ul {
                        padding-left: 20px;
                    }

                    li {
                        margin-bottom: 5px;
                    }

                    .page-footer {
                        position: fixed;
                        bottom: 15px;
                        left: 0;
                        right: 0;
                        text-align: center;
                        font-size: 10px;
                        color: #888;
                    }
                </style>
            </head>

            <body>
                <div class="page-footer">
                    Currículo — ${data.personal.name || 'Currículo'}
                </div>


                <header class="header">
                    <h1>
                        ${data.personal.name || 'Currículo'}
                    </h1>

                    <div class="contact">
                        ${data.personal.email
                ? `<span>${data.personal.email}</span>`
                : ''
            }

                        ${data.personal.phone
                ? `<span>${data.personal.phone}</span>`
                : ''
            }

                        ${data.personal.city
                ? `<span>${data.personal.city}</span>`
                : ''
            }
                    </div>
                </header>

                ${data.objective.desiredPosition ||
                data.objective.area ||
                data.objective.level ||
                data.objective.description
                ? `
            <h2>Objetivo profissional</h2>

            ${data.objective.desiredPosition
                    ? `
                        <div class="objective-position">
                            ${data.objective.desiredPosition}
                        </div>
                    `
                    : ''
                }

            ${data.objective.area ||
                    data.objective.level
                    ? `
                        <div class="objective-details">
                            ${data.objective.area
                        ? `<strong>Área:</strong> ${data.objective.area}`
                        : ''
                    }

                            ${data.objective.area &&
                        data.objective.level
                        ? ' • '
                        : ''
                    }

                            ${data.objective.level
                        ? `<strong>Nível:</strong> ${data.objective.level}`
                        : ''
                    }
                        </div>
                    `
                    : ''
                }

            ${data.objective.description
                    ? `
                        <p class="objective-description">
                            ${data.objective.description}
                        </p>
                    `
                    : ''
                }
        `
                : ''
            }

                ${data.experiences.length > 0
                ? `
                            <h2>Experiência profissional</h2>

                                ${data.experiences
                    .map(
                        (experience) => `
                                            <div class="experience-item">

                                                <div class="experience-header">
                                                    <div>
                                                        <div class="item-title">
                                                            ${experience.position}
                                                        </div>

                                                        <div class="company">
                                                            ${experience.company}
                                                        </div>
                                                    </div>

                                                    ${experience.startDate ||
                                experience.endDate
                                ? `
                                                                <div class="date">
                                                                    ${experience.startDate || ''}
                                                                    ${experience.startDate ||
                                    experience.endDate
                                    ? ' — '
                                    : ''
                                }
                                                                    ${experience.endDate || ''}
                                                                </div>
                                                            `
                                : ''
                            }
                                                </div>

                                                ${experience.description
                                ? `
                                                            <p class="experience-description">
                                                                ${experience.description}
                                                            </p>
                                                        `
                                : ''
                            }

                                            </div>
                                        `,
                    )
                    .join('')}
                        `
                : ''
            }

                ${data.education.length > 0
                ? `
                            <h2>Formação acadêmica</h2>

                            ${data.education
                    .map(
                        (education) => `
                                        <div class="education-item">

                                            <div class="education-header">
                                                <div>
                                                    <div class="item-title">
                                                        ${education.course}
                                                    </div>

                                                    <div class="institution">
                                                        ${education.institution}
                                                    </div>
                                                </div>

                                                ${education.startDate ||
                                education.endDate
                                ? `
                                                            <div class="date">
                                                                ${education.startDate || ''}
                                                                ${education.startDate ||
                                    education.endDate
                                    ? ' — '
                                    : ''
                                }
                                                                ${education.endDate || ''}
                                                            </div>
                                                        `
                                : ''
                            }
                                            </div>

                                        </div>
                                    `,
                    )
                    .join('')}
                        `
                : ''
            }

                ${data.skills.length > 0
                ? `
                            <h2>Habilidades</h2>

                            <div class="skills">
                                ${data.skills
                    .map(
                        (skill) =>
                            `<span class="skill">${skill}</span>`,
                    )
                    .join('')}
                            </div>
                        `
                : ''
            }
            </body>
        </html>
    `;

        try {
            const { uri } = await Print.printToFileAsync({
                html,
            });

            const canShare = await Sharing.isAvailableAsync();

            if (canShare) {
                await Sharing.shareAsync(uri);
            } else {
                Alert.alert(
                    'PDF gerado',
                    'O PDF foi gerado, mas o compartilhamento não está disponível neste dispositivo.',
                );
            }
        } catch (error) {
            console.error(
                'Erro ao gerar PDF:',
                error,
            );

            Alert.alert(
                'Erro',
                'Não foi possível gerar o PDF.',
            );
        }
    }

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

                <Pressable
                    style={styles.pdfButton}
                    onPress={handleGeneratePdf}
                >
                    <Text style={styles.pdfButtonText}>
                        Gerar PDF
                    </Text>
                </Pressable>
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

    pdfButton: {
        height: 48,
        borderRadius: 11,
        backgroundColor: '#F5B942',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 20,
    },

    pdfButtonText: {
        color: '#0B0F14',
        fontSize: 15,
        fontWeight: '700',
    },
});