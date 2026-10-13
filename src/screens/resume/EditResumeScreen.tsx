import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import {
    useNavigation,
    useRoute,
} from '@react-navigation/native';

import { useSavedResumes } from '../../context/SavedResumesContext';
import {
    Experience,
    Education,
} from '../../context/ResumeContext';
import { useEffect, useState } from 'react';

export default function EditResumeScreen() {
    const navigation = useNavigation();

    const route = useRoute();

    const {
        savedResumes,
        updateResume,
    } = useSavedResumes();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [desiredPosition, setDesiredPosition] = useState('');
    const [area, setArea] = useState('');
    const [level, setLevel] = useState('');
    const [objectiveDescription, setObjectiveDescription] =
        useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState('');
    const [experiences, setExperiences] =
        useState<Experience[]>([]);
    const [experiencePosition, setExperiencePosition] =
        useState('');

    const [experienceCompany, setExperienceCompany] =
        useState('');

    const [experienceStartDate, setExperienceStartDate] =
        useState('');

    const [experienceEndDate, setExperienceEndDate] =
        useState('');

    const [experienceDescription, setExperienceDescription] =
        useState('');

    const [education, setEducation] =
        useState<Education[]>([]);

    const [educationCourse, setEducationCourse] =
        useState('');

    const [educationInstitution, setEducationInstitution] =
        useState('');

    const [educationStartDate, setEducationStartDate] =
        useState('');

    const [educationEndDate, setEducationEndDate] =
        useState('');

    const [isSaving, setIsSaving] = useState(false);

    const { resumeId } = route.params as {
        resumeId: string;
    };

    function handleAddExperience() {
        const newExperience: Experience = {
            id: Date.now().toString(),
            position: experiencePosition,
            company: experienceCompany,
            startDate: experienceStartDate,
            endDate: experienceEndDate,
            description: experienceDescription,
        };

        setExperiences((current) => [
            ...current,
            newExperience,
        ]);

        setExperiencePosition('');
        setExperienceCompany('');
        setExperienceStartDate('');
        setExperienceEndDate('');
        setExperienceDescription('');
    }

    function handleAddEducation() {
        const newEducation: Education = {
            id: Date.now().toString(),
            course: educationCourse,
            institution: educationInstitution,
            startDate: educationStartDate,
            endDate: educationEndDate,
        };

        setEducation((current) => [
            ...current,
            newEducation,
        ]);

        setEducationCourse('');
        setEducationInstitution('');
        setEducationStartDate('');
        setEducationEndDate('');
    }

    function handleSave() {
        if (!savedResume) {
            return;
        }

        setIsSaving(true);

        const updatedExperiences =
            experiences.length === 0
                ? [
                    {
                        id: Date.now().toString(),
                        position: experiencePosition,
                        company: experienceCompany,
                        startDate: experienceStartDate,
                        endDate: experienceEndDate,
                        description: experienceDescription,
                    },
                ]
                : experiences.map(
                    (experience, index) => {
                        if (index !== 0) {
                            return experience;
                        }

                        return {
                            ...experience,
                            position: experiencePosition,
                            company: experienceCompany,
                            startDate: experienceStartDate,
                            endDate: experienceEndDate,
                            description: experienceDescription,
                        };
                    },
                );

        const updatedEducation =
            education.length === 0
                ? [
                    {
                        id: Date.now().toString(),
                        course: educationCourse,
                        institution: educationInstitution,
                        startDate: educationStartDate,
                        endDate: educationEndDate,
                    },
                ]
                : education.map(
                    (item, index) => {
                        if (index !== 0) {
                            return item;
                        }

                        return {
                            ...item,
                            course: educationCourse,
                            institution: educationInstitution,
                            startDate: educationStartDate,
                            endDate: educationEndDate,
                        };
                    },
                );

        updateResume(savedResume.id, {
            ...savedResume.data,

            personal: {
                ...savedResume.data.personal,
                name,
                email,
                phone,
                city,
            },

            objective: {
                ...savedResume.data.objective,
                desiredPosition,
                area,
                level,
                description: objectiveDescription,
            },

            skills,

            experiences: updatedExperiences,

            education: updatedEducation,
        });

        setIsSaving(false);

        navigation.goBack();
    }

    const savedResume = savedResumes.find(
        (item) => item.id === resumeId,
    );


    useEffect(() => {
        if (!savedResume) {
            return;
        }

        setName(savedResume.data.personal.name);
        setEmail(savedResume.data.personal.email);
        setPhone(savedResume.data.personal.phone);
        setCity(savedResume.data.personal.city);

        setDesiredPosition(
            savedResume.data.objective.desiredPosition,
        );

        setArea(savedResume.data.objective.area);

        setLevel(savedResume.data.objective.level);

        setObjectiveDescription(
            savedResume.data.objective.description,
        );

        setSkills(savedResume.data.skills);

        setExperiences(savedResume.data.experiences);

        setEducation(savedResume.data.education);

        const firstEducation =
            savedResume.data.education[0];

        if (firstEducation) {
            setEducationCourse(firstEducation.course);
            setEducationInstitution(
                firstEducation.institution,
            );
            setEducationStartDate(
                firstEducation.startDate,
            );
            setEducationEndDate(
                firstEducation.endDate,
            );
        }

        const firstExperience =
            savedResume.data.experiences[0];

        if (firstExperience) {
            setExperiencePosition(firstExperience.position);
            setExperienceCompany(firstExperience.company);
            setExperienceStartDate(firstExperience.startDate);
            setExperienceEndDate(firstExperience.endDate);
            setExperienceDescription(firstExperience.description);
        }
    }, [savedResume]);

    if (!savedResume) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorTitle}>
                    Currículo não encontrado
                </Text>

                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>
                        Voltar
                    </Text>
                </Pressable>
            </View>
        );
    }

    const { data } = savedResume;


    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>
                        ← Voltar
                    </Text>
                </Pressable>

                <Text style={styles.title}>
                    Editar currículo
                </Text>

                <Text style={styles.subtitle}>
                    Edite as informações do seu currículo
                </Text>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Dados pessoais
                    </Text>

                    <Text style={styles.label}>
                        Nome completo
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Digite seu nome completo"
                        placeholderTextColor="#6F7B88"
                    />

                    <Text style={styles.label}>
                        E-mail
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#6F7B88"
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>
                        Telefone
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Digite seu telefone"
                        placeholderTextColor="#6F7B88"
                        keyboardType="phone-pad"
                    />

                    <Text style={styles.label}>
                        Cidade
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={city}
                        onChangeText={setCity}
                        placeholder="Digite sua cidade"
                        placeholderTextColor="#6F7B88"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Objetivo profissional
                    </Text>

                    <Text style={styles.label}>
                        Cargo desejado
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={desiredPosition}
                        onChangeText={setDesiredPosition}
                        placeholder="Ex.: Desenvolvedor Java"
                        placeholderTextColor="#6F7B88"
                    />

                    <Text style={styles.label}>
                        Área
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={area}
                        onChangeText={setArea}
                        placeholder="Ex.: Tecnologia da Informação"
                        placeholderTextColor="#6F7B88"
                    />

                    <Text style={styles.label}>
                        Nível profissional
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={level}
                        onChangeText={setLevel}
                        placeholder="Ex.: Júnior, Pleno ou Sênior"
                        placeholderTextColor="#6F7B88"
                    />

                    <Text style={styles.label}>
                        Descrição do objetivo
                    </Text>

                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        value={objectiveDescription}
                        onChangeText={setObjectiveDescription}
                        placeholder="Descreva seu objetivo profissional"
                        placeholderTextColor="#6F7B88"
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Experiências
                    </Text>

                    {data.experiences.length === 0 ? (
                        <Text style={styles.emptyText}>
                            Nenhuma experiência cadastrada.
                        </Text>
                    ) : (
                        data.experiences.map((experience) => (
                            <View
                                key={experience.id}
                                style={styles.item}
                            >
                                <Text style={styles.itemTitle}>
                                    {experience.position}
                                </Text>

                                <Text style={styles.itemText}>
                                    {experience.company}
                                </Text>
                            </View>
                        ))
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>
                        Formação acadêmica
                    </Text>

                    {data.education.length === 0 ? (
                        <Text style={styles.emptyText}>
                            Nenhuma formação cadastrada.
                        </Text>
                    ) : (
                        data.education.map((education) => (
                            <View
                                key={education.id}
                                style={styles.item}
                            >
                                <Text style={styles.itemTitle}>
                                    {education.course}
                                </Text>

                                <Text style={styles.itemText}>
                                    {education.institution}
                                </Text>
                            </View>
                        ))
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Experiência profissional
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Cargo"
                        placeholderTextColor="#6F7B88"
                        value={experiencePosition}
                        onChangeText={setExperiencePosition}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Empresa"
                        placeholderTextColor="#6F7B88"
                        value={experienceCompany}
                        onChangeText={setExperienceCompany}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Data de início"
                        placeholderTextColor="#6F7B88"
                        value={experienceStartDate}
                        onChangeText={setExperienceStartDate}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Data de término"
                        placeholderTextColor="#6F7B88"
                        value={experienceEndDate}
                        onChangeText={setExperienceEndDate}
                    />

                    <TextInput
                        style={[styles.input, styles.multilineInput]}
                        placeholder="Descrição das atividades"
                        placeholderTextColor="#6F7B88"
                        value={experienceDescription}
                        onChangeText={setExperienceDescription}
                        multiline
                        textAlignVertical="top"
                    />

                    <Pressable
                        style={styles.secondaryButton}
                        onPress={handleAddExperience}
                    >
                        <Text style={styles.secondaryButtonText}>
                            Adicionar outra experiência
                        </Text>
                    </Pressable>

                    {experiences.slice(1).map((experience) => (
                        <View
                            key={experience.id}
                            style={styles.experienceCard}
                        >
                            <Text style={styles.experienceTitle}>
                                {experience.position || 'Cargo não informado'}
                            </Text>

                            <Text style={styles.experienceCompany}>
                                {experience.company || 'Empresa não informada'}
                            </Text>

                            <Text style={styles.experienceDate}>
                                {experience.startDate} - {experience.endDate}
                            </Text>

                            <Text style={styles.experienceDescription}>
                                {experience.description}
                            </Text>

                            <Pressable
                                onPress={() => {
                                    setExperiences((current) =>
                                        current.filter(
                                            (item) => item.id !== experience.id,
                                        ),
                                    );
                                }}
                            >
                                <Text style={styles.removeExperienceText}>
                                    Remover experiência
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Formação acadêmica
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Curso"
                        placeholderTextColor="#6F7B88"
                        value={educationCourse}
                        onChangeText={setEducationCourse}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Instituição"
                        placeholderTextColor="#6F7B88"
                        value={educationInstitution}
                        onChangeText={setEducationInstitution}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Data de início"
                        placeholderTextColor="#6F7B88"
                        value={educationStartDate}
                        onChangeText={setEducationStartDate}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Data de término"
                        placeholderTextColor="#6F7B88"
                        value={educationEndDate}
                        onChangeText={setEducationEndDate}
                    />

                    <Pressable
                        style={styles.secondaryButton}
                        onPress={handleAddEducation}
                    >
                        <Text style={styles.secondaryButtonText}>
                            Adicionar outra formação
                        </Text>
                    </Pressable>

                    {education.slice(1).map((item) => (
                        <View
                            key={item.id}
                            style={styles.educationCard}
                        >
                            <Text style={styles.educationTitle}>
                                {item.course || 'Curso não informado'}
                            </Text>

                            <Text style={styles.educationInstitution}>
                                {item.institution ||
                                    'Instituição não informada'}
                            </Text>

                            <Text style={styles.educationDate}>
                                {item.startDate} - {item.endDate}
                            </Text>

                            <Pressable
                                onPress={() => {
                                    setEducation((current) =>
                                        current.filter(
                                            (educationItem) =>
                                                educationItem.id !== item.id,
                                        ),
                                    );
                                }}
                            >
                                <Text style={styles.removeEducationText}>
                                    Remover formação
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Habilidades
                    </Text>

                    <View style={styles.skillInputRow}>
                        <TextInput
                            style={styles.skillInput}
                            placeholder="Digite uma habilidade"
                            placeholderTextColor="#6F7B88"
                            value={skillInput}
                            onChangeText={setSkillInput}
                        />

                        <Pressable
                            style={styles.addSkillButton}
                            onPress={() => {
                                const newSkill = skillInput.trim();

                                if (!newSkill) {
                                    return;
                                }

                                if (skills.includes(newSkill)) {
                                    return;
                                }

                                setSkills((current) => [
                                    ...current,
                                    newSkill,
                                ]);

                                setSkillInput('');
                            }}
                        >
                            <Text style={styles.addSkillButtonText}>
                                Adicionar
                            </Text>
                        </Pressable>
                    </View>

                    <View style={styles.skillsContainer}>
                        {skills.map((skill) => (
                            <View
                                key={skill}
                                style={styles.skillTag}
                            >
                                <Text style={styles.skillText}>
                                    {skill}
                                </Text>

                                <Pressable
                                    onPress={() => {
                                        setSkills((current) =>
                                            current.filter(
                                                (item) => item !== skill,
                                            ),
                                        );
                                    }}
                                >
                                    <Text style={styles.removeSkillText}>
                                        ×
                                    </Text>
                                </Pressable>
                            </View>
                        ))}
                    </View>
                </View>

                <Pressable
                    style={[
                        styles.saveButton,
                        isSaving && styles.saveButtonDisabled,
                    ]}
                    onPress={handleSave}
                    disabled={isSaving}
                >
                    <Text style={styles.saveButtonText}>
                        {isSaving
                            ? 'Salvando...'
                            : 'Salvar alterações'}
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

    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 24,
    },

    backButtonText: {
        color: '#F5B942',
        fontSize: 14,
        fontWeight: '600',
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
        marginBottom: 24,
    },

    card: {
        backgroundColor: '#111820',
        borderWidth: 1,
        borderColor: '#28313C',
        borderRadius: 18,
        padding: 18,
        marginBottom: 16,
    },

    sectionTitle: {
        color: '#F5F7FA',
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 18,
    },

    label: {
        color: '#6F7B88',
        fontSize: 12,
        marginTop: 10,
        marginBottom: 4,
    },

    value: {
        color: '#F5F7FA',
        fontSize: 14,
    },

    input: {
        height: 46,
        backgroundColor: '#0B0F14',
        borderWidth: 1,
        borderColor: '#28313C',
        borderRadius: 11,
        paddingHorizontal: 14,
        color: '#F5F7FA',
        fontSize: 14,
        marginBottom: 8,
    },

    multilineInput: {
        height: 110,
        paddingTop: 12,
    },

    item: {
        paddingBottom: 14,
        marginBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#28313C',
    },

    itemTitle: {
        color: '#F5F7FA',
        fontSize: 14,
        fontWeight: '700',
    },

    itemText: {
        color: '#AAB4BF',
        fontSize: 13,
        marginTop: 4,
    },

    emptyText: {
        color: '#6F7B88',
        fontSize: 13,
    },

    skills: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    skill: {
        backgroundColor: '#1D2732',
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },

    errorTitle: {
        color: '#F5F7FA',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 100,
    },

    saveButton: {
        height: 48,
        borderRadius: 12,
        backgroundColor: '#F5B942',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
    },

    saveButtonText: {
        color: '#0B0F14',
        fontSize: 14,
        fontWeight: '700',
    },

    section: {
        marginBottom: 24,
    },

    skillInputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
    },

    skillInput: {
        flex: 1,
        height: 46,
        backgroundColor: '#0B0F14',
        borderWidth: 1,
        borderColor: '#28313C',
        borderRadius: 11,
        paddingHorizontal: 14,
        color: '#F5F7FA',
        fontSize: 14,
    },

    addSkillButton: {
        height: 46,
        paddingHorizontal: 14,
        borderRadius: 11,
        backgroundColor: '#F5B942',
        justifyContent: 'center',
        alignItems: 'center',
    },

    addSkillButtonText: {
        color: '#0B0F14',
        fontSize: 13,
        fontWeight: '700',
    },

    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },

    skillTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A222C',
        borderWidth: 1,
        borderColor: '#28313C',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
    },

    skillText: {
        color: '#F5F7FA',
        fontSize: 13,
    },

    removeSkillText: {
        color: '#F5B942',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 8,
    },

    secondaryButton: {
        borderWidth: 1,
        borderColor: '#F5B942',
        borderRadius: 11,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 16,
    },

    secondaryButtonText: {
        color: '#F5B942',
        fontSize: 13,
        fontWeight: '700',
    },

    experienceCard: {
        backgroundColor: '#111820',
        borderWidth: 1,
        borderColor: '#28313C',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
    },

    experienceTitle: {
        color: '#F5F7FA',
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },

    experienceCompany: {
        color: '#AAB4BF',
        fontSize: 13,
        marginBottom: 4,
    },

    experienceDate: {
        color: '#6F7B88',
        fontSize: 12,
        marginBottom: 8,
    },

    experienceDescription: {
        color: '#AAB4BF',
        fontSize: 13,
        lineHeight: 19,
        marginBottom: 12,
    },

    removeExperienceText: {
        color: '#E57373',
        fontSize: 13,
        fontWeight: '600',
    },

    educationCard: {
        backgroundColor: '#111820',
        borderWidth: 1,
        borderColor: '#28313C',
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
    },

    educationTitle: {
        color: '#F5F7FA',
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },

    educationInstitution: {
        color: '#AAB4BF',
        fontSize: 13,
        marginBottom: 4,
    },

    educationDate: {
        color: '#6F7B88',
        fontSize: 12,
        marginBottom: 12,
    },

    removeEducationText: {
        color: '#E57373',
        fontSize: 13,
        fontWeight: '600',
    },

    saveButtonDisabled: {
        opacity: 0.6,
    },
});