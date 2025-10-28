import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { perfil } from '../../../Usuario/services/serviceUsuario';
import type { Usuario } from '../../../Usuario/interfaces/usuario.interface';
import { ModalHome } from './ModalHome';
import { Box, Typography } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';


export const Home: React.FC = () => {
    const [profile, setProfile] = useState<Usuario>({
        _id: '',
        nombre: '',
        apellidos: '',
        username: '',
        rol: '',
        flag: '',
    });
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const handleInputChange = (field: keyof Usuario, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };   
    useEffect(() => {
        obtenerPerfil();
    }, [])

    const obtenerPerfil = async () => {
        try {
            const response = await perfil();
            setProfile(response);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        if (isRegister) {
            toast.success('Contraseña cambiada correctamente');
            setIsRegister(false);
        }
    }, [isRegister])

    return (
        <Box className="min-h-screen p-4 md:p-8">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Box className="max-w-4xl mx-auto">
                {/* Header */}
                <Box sx={{ background: '#fff', borderRadius: 2, boxShadow: 1, p: 4, mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box 
                            sx={{
                                background: 'linear-gradient(to bottom right, rgba(82, 163, 255, 1), rgba(78, 56, 245, 1))',
                                borderRadius: '50%',
                                p: 2,
                            }}
                            >
                                <User className="w-8 h-8 text-white" />
                            </Box>
                            <Box sx={{ ml: 2 }}>
                                <Typography variant="h5" component="h2" gutterBottom>
                                    Perfil de Usuario
                                </Typography>
                                <Typography variant="body1">Gestiona tu información personal</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src="logoAnaytics.svg" alt="" className="w-24 h-24" />
                            <Typography variant="h6" component="div" fontWeight={600}>
                                Anaytics
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                Información Personal
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.nombre || ''} // ✅ Esto previene undefined
                                        onChange={(e) => handleInputChange('nombre', e.target.value)}
                                        disabled
                                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 border-gray-200 bg-gray-50`}
                                        placeholder="Ingresa tu nombre"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Apellidos
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.apellidos}
                                        onChange={(e) => handleInputChange('apellidos', e.target.value)}
                                        disabled
                                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 border-gray-200 bg-gray-50`}
                                        placeholder="Ingresa tus apellidos"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
                                Información de Cuenta
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.username}
                                        onChange={(e) => handleInputChange('username', e.target.value)}
                                        disabled
                                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 border-gray-200 bg-gray-50`}
                                        placeholder="Ingresa tu nombre de usuario"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Rol
                                    </label>
                                    <select
                                        value={profile.rol}
                                        onChange={(e) => handleInputChange('rol', e.target.value)}
                                        disabled
                                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 border-gray-200 bg-gray-50`}
                                    >
                                        <option value={profile.rol}>{profile.rol}</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Estado
                                    </label>
                                    <select
                                        value={profile.flag}
                                        onChange={(e) => handleInputChange('flag', e.target.value)}
                                        disabled
                                        className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 border-gray-200 bg-gray-50`}
                                    >
                                        <option value={profile.flag}>{profile.flag}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200 space-y-4 sm:space-y-0">
                        <button
                            onClick={() => setShowPasswordModal(true)}
                            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                        >
                            Cambiar Contraseña
                        </button>
                    </div>
                </div>

                {showPasswordModal && (
                    <ModalHome onClose={() => setShowPasswordModal(false)} setIsRegister={setIsRegister} id={profile._id} />
                )}
            </Box>
        </Box>
    );
};